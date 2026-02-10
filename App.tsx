
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import GamesSection from './components/GamesSection';
import ExchangeSection from './components/ExchangeSection';
import AdvisorSection from './components/AdvisorSection';
import { AppTab, UserProfile } from './types';
import { WifiOff } from 'lucide-react';

const INITIAL_USER: UserProfile = {
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  cryptoBalance: 45230.12,
  bonusPoints: 8450,
  walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
};

function App() {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // Load initial state from local storage or use default
  const [user, setUser] = useState<UserProfile>(() => {
    const savedUser = localStorage.getItem('nexus_user_data');
    return savedUser ? JSON.parse(savedUser) : INITIAL_USER;
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('nexus_user_data', JSON.stringify(user));
  }, [user]);

  // Connectivity Listeners
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleEarnBonus = (amount: number) => {
    setUser(prev => ({
      ...prev,
      bonusPoints: prev.bonusPoints + amount
    }));
  };

  const handleConvertBonus = (points: number, to: 'crypto' | 'stp') => {
    const valueInUsd = points / 100;
    setUser(prev => ({
      ...prev,
      bonusPoints: prev.bonusPoints - points,
      cryptoBalance: to === 'crypto' ? prev.cryptoBalance + valueInUsd : prev.cryptoBalance
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard />;
      case AppTab.WALLET:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500 space-y-4">
            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800">
              <span className="text-4xl">🔐</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-300">Billetera de Transferencias Seguras</h3>
            <p className="max-w-md text-center">Accede a tus fondos protegidos por NexusGuard. Aquí puedes enviar y recibir activos a nivel mundial.</p>
            <button className="mt-4 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors">
              Iniciar Transferencia
            </button>
          </div>
        );
      case AppTab.GAMES:
        return <GamesSection onEarnBonus={handleEarnBonus} />;
      case AppTab.EXCHANGE:
        return <ExchangeSection bonusPoints={user.bonusPoints} onConvert={handleConvertBonus} />;
      case AppTab.AI_ADVISOR:
        return <AdvisorSection />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="relative">
      {!isOnline && (
        <div className="bg-red-600 text-white py-1 px-4 text-center text-xs font-bold animate-pulse flex items-center justify-center space-x-2 z-[100] sticky top-0">
          <WifiOff size={14} />
          <span>ESTÁS EN MODO OFFLINE - ALGUNAS FUNCIONES IA ESTÁN DESHABILITADAS</span>
        </div>
      )}
      <Layout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userBonus={user.bonusPoints}
      >
        {renderContent()}
      </Layout>
    </div>
  );
}

export default App;
