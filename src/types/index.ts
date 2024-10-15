import { IconDefinition } from '@fortawesome/free-solid-svg-icons';


export interface GameState {
  tiles: Tile[];
  revealedTiles: number[]; 
  attempts: number;
  timer: number;
  timerInterval: NodeJS.Timeout | null;
  difficulty: Difficulty;
  gameStarted: boolean;
  gameHistory: GameHistoryItem[];
  isLoading: boolean;
  matchedPairs: number;
  selectedIcons: string[];

  revealTile: (id: number) => void;
  checkMatch: () => void;
  resetGame: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  startTimer: () => void;
  stopTimer: () => void;
  addGameToHistory: () => void;
  startGame: () => void;
  handleWin: () => void;
  updateSelectedIcons: (icons: string[]) => void;
  handleRandomize: () => void;
}

export interface Tile {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameHistoryItem {
  attempts: number;
  time: string;
  date: string;
}

/* PROPS */
export interface TileProps {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface TilesProps {
  tiles: TileProps[];
}

export interface IconSelectorProps {
  availableImages: string[];
  maxIcons: number;
}

export interface GameBoardHeaderProps {
  attempts: number;
  timer: number;
}

export interface GameBoardFooterProps {
  matchedPairs: number;
  totalPairs: number;
  animateClass: string;
}

export interface GameBoardButtonsProps {
  gameStarted: boolean;
  startGame: () => void;
  resetGame: () => void;
}

export interface GameBoardDifficultyProps {
  selectedDifficulty: string;
  handleDifficultyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface ButtonProps {
  onClick: () => void;
  label: string;
  icon: IconDefinition;
  className?: string;
}