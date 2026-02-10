
import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Gamepad2, 
  ArrowLeftRight, 
  Bot, 
  LogOut,
  Bell,
  Search,
  User
} from 'lucide-react';
import { AppTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  userBonus: number;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, userBonus }) => {
  const menuItems = [
    { id: AppTab.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: AppTab.WALLET, label: 'Billetera', icon: Wallet },
    { id: AppTab.GAMES, label: 'Juegos & Bonos', icon: Gamepad2 },
    { id: AppTab.EXCHANGE, label: 'Conversión/STP', icon: ArrowLeftRight },
    { id: AppTab.AI_ADVISOR, label: 'Asesor IA', icon: Bot },
  ];

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col hidden md:flex">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            NexusCrypto
          </h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 p-4 rounded-xl mb-4">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Mis Bonos</p>
            <p className="text-xl font-bold text-yellow-500">{userBonus} pts</p>
          </div>
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-900/20 hover:text-red-400 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center bg-slate-800/50 rounded-lg px-3 py-1.5 w-64 md:w-96">
            <Search size={18} className="text-slate-500 mr-2" />
            <input 
              type="text" 
              placeholder="Buscar activos..." 
              className="bg-transparent border-none outline-none text-sm w-full text-slate-200"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-white relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></span>
            </button>
            <div className="h-8 w-px bg-slate-800 mx-2"></div>
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-200">Alex Rivera</p>
                <p className="text-xs text-slate-500">Premium Member</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                AR
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex justify-around items-center bg-slate-900 border-t border-slate-800 p-2 pb-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`p-2 rounded-lg flex flex-col items-center space-y-1 ${
                  activeTab === item.id ? 'text-blue-500' : 'text-slate-500'
                }`}
              >
                <Icon size={20} />
                <span className="text-[10px] uppercase font-bold tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </main>
    </div>
  );
};

export default Layout;
