
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, ArrowUpRight, DollarSign, Wallet as WalletIcon } from 'lucide-react';
import { INITIAL_ASSETS } from '../constants';

const data = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 5000 },
  { name: 'Thu', value: 4500 },
  { name: 'Fri', value: 6000 },
  { name: 'Sat', value: 5500 },
  { name: 'Sun', value: 7000 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 hover:border-blue-500/30 transition-all shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
              <DollarSign size={24} />
            </div>
            <span className="text-green-500 text-sm font-bold flex items-center">
              +12.5% <TrendingUp size={14} className="ml-1" />
            </span>
          </div>
          <p className="text-slate-400 text-sm font-medium">Balance Total</p>
          <h3 className="text-3xl font-bold text-white mt-1">$45,230.12</h3>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-500">
              <WalletIcon size={24} />
            </div>
            <span className="text-slate-400 text-xs font-medium">Última 24h</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">Ganancias de Hoy</p>
          <h3 className="text-3xl font-bold text-white mt-1">+$1,240.50</h3>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 hover:border-yellow-500/30 transition-all shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-500/10 rounded-2xl text-yellow-500">
              <ArrowUpRight size={24} />
            </div>
            <span className="text-yellow-500 text-xs font-bold px-2 py-1 bg-yellow-500/10 rounded-lg">BONO VIP</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">Bonos Acumulados</p>
          <h3 className="text-3xl font-bold text-white mt-1">8,450 pts</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/50 p-6 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl font-bold text-white">Rendimiento de Portafolio</h4>
            <div className="flex bg-slate-800 p-1 rounded-xl">
              {['1D', '1W', '1M', '1Y'].map(t => (
                <button key={t} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${t === '1W' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
          <h4 className="text-xl font-bold text-white mb-6">Activos Top</h4>
          <div className="space-y-6">
            {INITIAL_ASSETS.map((asset) => (
              <div key={asset.id} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl group-hover:bg-blue-600 transition-colors">
                    {asset.icon}
                  </div>
                  <div>
                    <p className="font-bold text-white">{asset.name}</p>
                    <p className="text-xs text-slate-500 uppercase font-bold">{asset.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">${asset.price.toLocaleString()}</p>
                  <p className={`text-xs font-bold flex items-center justify-end ${asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {asset.change24h >= 0 ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                    {Math.abs(asset.change24h)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-slate-800 text-slate-300 rounded-xl font-bold hover:bg-slate-700 transition-colors">
            Ver todos los activos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
