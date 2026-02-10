
import { Asset } from './types';

export const INITIAL_ASSETS: Asset[] = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC', price: 64230.45, change24h: 2.4, balance: 0.12, icon: '₿' },
  { id: '2', name: 'Ethereum', symbol: 'ETH', price: 3450.12, change24h: -1.2, balance: 1.5, icon: 'Ξ' },
  { id: '3', name: 'Solana', symbol: 'SOL', price: 145.80, change24h: 5.7, balance: 25.0, icon: 'S' },
  { id: '4', name: 'Cardano', symbol: 'ADA', price: 0.45, change24h: 0.8, balance: 1200, icon: 'A' },
];

export const GAME_LIST = [
  { id: 'g1', name: 'Cripto-Quiz', description: 'Pon a prueba tus conocimientos y gana bonos.', reward: 50, icon: '🧠' },
  { id: 'g2', name: 'Predictor de Velas', description: 'Adivina la tendencia de la próxima hora.', reward: 100, icon: '📈' },
  { id: 'g3', name: 'Minero Veloz', description: 'Toca rápido para minar bloques virtuales.', reward: 25, icon: '⛏️' },
];
