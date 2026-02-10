
import React, { useState } from 'react';
import { ArrowLeftRight, Landmark, Coins, ChevronRight, CheckCircle2, ShieldCheck, Info } from 'lucide-react';

interface ExchangeSectionProps {
  bonusPoints: number;
  onConvert: (points: number, to: 'crypto' | 'stp') => void;
}

const ExchangeSection: React.FC<ExchangeSectionProps> = ({ bonusPoints, onConvert }) => {
  const [amount, setAmount] = useState<string>('');
  const [target, setTarget] = useState<'crypto' | 'stp'>('crypto');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleExchange = () => {
    const pts = parseInt(amount);
    if (pts > 0 && pts <= bonusPoints) {
      onConvert(pts, target);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
      setAmount('');
    }
  };

  const estimatedValue = amount ? (parseInt(amount) / 100).toFixed(2) : '0.00';

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Column */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            Convertir Bonos <ArrowLeftRight className="ml-2 text-blue-500" />
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="text-sm font-bold text-slate-400 mb-2 block uppercase tracking-wider">Monto a convertir</label>
              <div className="relative">
                <input 
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0 pts"
                  className="w-full bg-slate-800 border-2 border-slate-700 focus:border-blue-600 rounded-2xl py-4 px-6 text-2xl font-black text-white outline-none transition-all"
                />
                <button 
                  onClick={() => setAmount(bonusPoints.toString())}
                  className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg text-xs font-bold hover:bg-blue-600/40"
                >
                  MAX
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2 font-medium">Bonos disponibles: <span className="text-blue-400 font-bold">{bonusPoints} pts</span></p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setTarget('crypto')}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center space-y-2 ${target === 'crypto' ? 'border-blue-600 bg-blue-600/10 text-blue-400' : 'border-slate-800 bg-slate-800/50 text-slate-500'}`}
              >
                <Coins size={28} />
                <span className="font-bold">A Cripto</span>
              </button>
              <button 
                onClick={() => setTarget('stp')}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center space-y-2 ${target === 'stp' ? 'border-blue-600 bg-blue-600/10 text-blue-400' : 'border-slate-800 bg-slate-800/50 text-slate-500'}`}
              >
                <Landmark size={28} />
                <span className="font-bold">A STP</span>
              </button>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/50">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500 font-medium">Tasa de conversión</span>
                <span className="text-slate-200 font-bold">100 pts = $1.00 USD</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-slate-300 font-bold">Recibirás aprox.</span>
                <span className="text-white font-black">${estimatedValue}</span>
              </div>
            </div>

            <button 
              disabled={!amount || parseInt(amount) > bonusPoints || isSuccess}
              onClick={handleExchange}
              className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center space-x-3 ${isSuccess ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40 disabled:opacity-50 disabled:cursor-not-allowed'}`}
            >
              {isSuccess ? (
                <><CheckCircle2 /> <span>Conversión Exitosa</span></>
              ) : (
                <><span>Procesar Transferencia</span> <ChevronRight size={20} /></>
              )}
            </button>
          </div>
        </div>

        {/* Security / Info Column */}
        <div className="space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
            <h4 className="text-white font-bold mb-4 flex items-center">
              <ShieldCheck size={20} className="text-green-500 mr-2" /> Seguridad Nexus
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              NexusCrypto utiliza cifrado de nivel militar y validación multicapa para asegurar que todas las conversiones de bonos y retiros STP sean instantáneos y protegidos.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-xs text-slate-500 font-bold">
                <CheckCircle2 size={12} className="text-green-500 mr-2" /> PROTOCOLO DE RETIRO SEGURO (PRS)
              </div>
              <div className="flex items-center text-xs text-slate-500 font-bold">
                <CheckCircle2 size={12} className="text-green-500 mr-2" /> INTEGRACIÓN DIRECTA CON SPEI/STP
              </div>
              <div className="flex items-center text-xs text-slate-500 font-bold">
                <CheckCircle2 size={12} className="text-green-500 mr-2" /> SIN COMISIONES DE CONVERSIÓN
              </div>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-500/20 rounded-3xl p-6">
            <h4 className="text-blue-400 font-bold mb-3 flex items-center">
              <Info size={18} className="mr-2" /> ¿Qué es STP?
            </h4>
            <p className="text-blue-200/70 text-sm leading-relaxed">
              El Sistema de Transferencias y Pagos (STP) permite enviar tus fondos directamente a cualquier cuenta bancaria mexicana vía CLABE de forma segura las 24 horas del día.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
            <h4 className="text-white font-bold mb-3">Historial de Conversión</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl">
                <div>
                  <p className="text-sm font-bold text-white">Bono a Ethereum</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Ayer 14:32</p>
                </div>
                <p className="text-green-500 font-black">+0.005 ETH</p>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl opacity-60">
                <div>
                  <p className="text-sm font-bold text-white">Bono a STP (BBVA)</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">12 Oct 09:15</p>
                </div>
                <p className="text-green-500 font-black">+$450.00 MXN</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeSection;
