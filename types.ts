
export interface Asset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  balance: number;
  icon: string;
}

export interface UserProfile {
  name: string;
  email: string;
  cryptoBalance: number;
  bonusPoints: number;
  walletAddress: string;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'convert';
  asset: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  address?: string;
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  WALLET = 'wallet',
  GAMES = 'games',
  EXCHANGE = 'exchange',
  AI_ADVISOR = 'ai_advisor'
}
