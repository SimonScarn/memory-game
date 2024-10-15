import { availableImages } from '../assets/icons';
import { Difficulty, GameHistoryItem } from '../types';


export const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export const getDifficultyNumber = (difficulty: Difficulty): number => {
  const difficultyObj = { easy: 8, medium: 12, hard: 16 };
  return difficultyObj[difficulty]; 
};

export const shuffleArray = <T,>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  
  return date.toLocaleString('pl-PL', options); 
};

export const saveGameHistoryToLocalStorage = (gameHistory: GameHistoryItem[]) => {
  localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
};

export const getRandomIcons = (max: number) => {
  return [...availableImages]
    .sort(() => Math.random() - 0.5)
    .slice(0, max); 
};