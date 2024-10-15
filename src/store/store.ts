import { create } from 'zustand';
import {
  formatDate,
  formatTime,
  getDifficultyNumber,
  getRandomIcons,
  saveGameHistoryToLocalStorage,
  shuffleArray,
} from '../utils/utils';
import { Difficulty, GameHistoryItem, GameState } from '../types';


const useStore = create<GameState>((set, get) => {
  const initialDifficulty: Difficulty = 'easy';

  return {
    tiles: [],
    revealedTiles: [],
    attempts: 0,
    timer: 0,
    timerInterval: null,
    difficulty: initialDifficulty,
    gameStarted: false,
    gameHistory: JSON.parse(localStorage.getItem('gameHistory') || '[]') as GameHistoryItem[],
    isLoading: false,
    matchedPairs: 0,
    selectedIcons: [],

    revealTile: (id: number) => {
      const { tiles, revealedTiles, checkMatch } = get();
      const tile = tiles.find(tile => tile.id === id);
      if (revealedTiles.length === 2 || tile?.isFlipped || tile?.isMatched) {
        return;
      }

      const newTiles = tiles.map(tile => tile.id === id ? { ...tile, isFlipped: true } : tile);
      set({ tiles: newTiles, revealedTiles: [...revealedTiles, id] });
      if (revealedTiles.length === 1) {
        setTimeout(checkMatch, 1000);
      }
    },
    checkMatch: () => {
      const { tiles, revealedTiles, matchedPairs, handleWin } = get();
      if (revealedTiles.length !== 2) return;

      const [firstTileIndex, secondTileIndex] = revealedTiles;
      const firstTile = tiles.find(tile => tile.id === firstTileIndex);
      const secondTile = tiles.find(tile => tile.id === secondTileIndex);

      if (firstTile && secondTile && firstTile.image === secondTile.image) {
        const newTiles = tiles.map(tile =>
          tile.id === firstTile.id || tile.id === secondTile.id ? { ...tile, isMatched: true } : tile
        );
        set({ tiles: newTiles, matchedPairs: matchedPairs + 1 });
        const totalPairs = tiles.length / 2;
        if (matchedPairs + 1 === totalPairs) {
          handleWin();
        }
      } else {
        const newTiles = tiles.map(tile => tile.isMatched ? tile : { ...tile, isFlipped: false });
        set({ tiles: newTiles });
      }
      set({ revealedTiles: [] });
    },
    updateSelectedIcons: (icons: string[]) => {
      set({ selectedIcons: icons });
    },
    handleRandomize: () => {
      const { updateSelectedIcons, difficulty } = get();
      const pairsNumber = getDifficultyNumber(difficulty);
      const randomIcons = getRandomIcons(pairsNumber / 2);
      updateSelectedIcons(randomIcons);
    },
    resetGame: () => {
      const { stopTimer } = get();
      stopTimer();
      set({
        tiles: [],
        revealedTiles: [],
        gameStarted: false,
        matchedPairs: 0,
        timer: 0,
      });
    },
    handleWin: () => {
      const { stopTimer, resetGame, addGameToHistory } = get();
      stopTimer();
      addGameToHistory();
      set({ isLoading: true });
      setTimeout(() => {
        resetGame();
        get().startGame(); 
        set({ isLoading: false });
      }, 2000);
    },
    startGame: () => {
      const { resetGame, startTimer, handleRandomize, selectedIcons, difficulty } = get();
      resetGame();
      set({ attempts: get().attempts + 1 });
      let icons = selectedIcons;
      const numberOfTiles = getDifficultyNumber(difficulty);
      const requiredIcons = numberOfTiles / 2;
      if (icons.length < requiredIcons) {
        handleRandomize();
        icons = get().selectedIcons;
      }
      icons = icons.slice(0, requiredIcons);
      const newTiles = shuffleArray([...icons, ...icons].map((image, id) => ({
        id,
        image,
        isFlipped: false,
        isMatched: false,
      })));
      set({
        tiles: newTiles,
        gameStarted: true,
      });
      startTimer();
    },
    setDifficulty: (difficulty: Difficulty) => {
      const { resetGame } = get();
      set({ difficulty, selectedIcons: [] });
      resetGame();
    },
    startTimer: () => {
      const { timerInterval } = get();

      if (!timerInterval) {
        const interval = setInterval(() => {
          set(state => ({ timer: state.timer + 1 }));
        }, 1000);
        set({ timerInterval: interval });
      }
    },
    stopTimer: () => {
      const { timerInterval } = get();
      if (timerInterval) {
        clearInterval(timerInterval);
        set({ timerInterval: null });
      }
    },
    addGameToHistory: () => {
      const { attempts, timer, gameHistory } = get();
      const formattedDate = formatDate(new Date());
      const formattedTime = formatTime(timer);
      const newHistory: GameHistoryItem[] = [
        ...gameHistory,
        { attempts, time: formattedTime, date: formattedDate }
      ];
      set({ gameHistory: newHistory });
      saveGameHistoryToLocalStorage(newHistory);
    },

  };
});

export default useStore;
