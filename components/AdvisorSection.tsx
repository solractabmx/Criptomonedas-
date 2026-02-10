
import React, { useState } from 'react';
import { Bot, Sparkles, Send, Loader2, TrendingUp, AlertTriangle } from 'lucide-react';
import { getMarketAnalysis } from '../services/geminiService';
import { INITIAL_ASSETS } from '../constants';

const AdvisorSection: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<string>(INITIAL_ASSETS[0].name);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchAnalysis = async () => {
    setLoading(true);
    const result = await getMarketAnalysis(selectedAsset);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-right duration-700">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Bot size={120} />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-900/40">
                <Bot size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Nexus Advisor AI</h2>
                <span className="text-blue-500 text-xs font-black uppercase tracking-tighter">Potenciado por Gemini 3</span>
              </div>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 mb-8">
              <p className="text-slate-300 text-lg leading-relaxed mb-6 font-medium">
                ¿Qué criptoactivo te gustaría que analice hoy para optimizar tu portafolio?
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {INITIAL_ASSETS.map(a => (
                  <button 
                    key={a.id}
                    onClick={() => setSelectedAsset(a.name)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${selectedAsset === a.name ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                  >
                    {a.name}
                  </button>
                ))}
              </div>

              <button 
                onClick={fetchAnalysis}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-2xl font-black flex items-center justify-center space-x-2 transition-all shadow-xl shadow-blue-900/20"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
                <span>{loading ? 'Consultando IA...' : 'Generar Análisis Profundo'}</span>
              </button>
            </div>

            {analysis && (
              <div className="bg-slate-800/30 p-8 rounded-[2rem] border border-blue-500/20 animate-in fade-in duration-500">
                <div className="flex items-center space-x-2 mb-4 text-blue-400 font-black text-xs uppercase tracking-widest">
                  <TrendingUp size={16} />
                  <span>Resultado del Análisis</span>
                </div>
                <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed font-medium text-lg italic">
                  "{analysis}"
                </div>
                <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start space-x-3">
                  <AlertTriangle className="text-yellow-500 shrink-0 mt-1" size={18} />
                  <p className="text-xs text-yellow-500/80 font-medium">
                    Nota: Los análisis de IA son informativos y no constituyen consejos financieros oficiales. Realice su propia investigación.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-80 space-y-6">
          <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
            <h4 className="text-white font-bold mb-4">Capacidades del Asesor</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center">
                  <CheckCircle2Icon size={16} />
                </div>
                <p className="text-sm text-slate-400 font-medium">Análisis de Sentimiento</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <CheckCircle2Icon size={16} />
                </div>
                <p className="text-sm text-slate-400 font-medium">Predicción de Volatilidad</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                  <CheckCircle2Icon size={16} />
                </div>
                <p className="text-sm text-slate-400 font-medium">Lectura de Noticias 24/7</p>
              </div>
            </div>
          </div>
          
          <img 
            src="https://picsum.photos/seed/crypto/400/400" 
            alt="Market Chart" 
            className="w-full rounded-3xl border border-slate-800 grayscale hover:grayscale-0 transition-all cursor-pointer shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

const CheckCircle2Icon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
);

export default AdvisorSection;
