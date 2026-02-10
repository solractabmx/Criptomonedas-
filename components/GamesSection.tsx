
import React, { useState } from 'react';
import { Trophy, Star, Gamepad2, Brain, Zap, Play } from 'lucide-react';
import { GAME_LIST } from '../constants';
import { generateCryptoQuiz } from '../services/geminiService';

interface GamesSectionProps {
  onEarnBonus: (amount: number) => void;
}

const GamesSection: React.FC<GamesSectionProps> = ({ onEarnBonus }) => {
  const [playingQuiz, setPlayingQuiz] = useState(false);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const startQuiz = async () => {
    setLoadingQuiz(true);
    const quiz = await generateCryptoQuiz();
    setCurrentQuiz(quiz);
    setLoadingQuiz(false);
    setPlayingQuiz(true);
  };

  const handleAnswer = (option: string) => {
    if (option === currentQuiz.correctAnswer) {
      setQuizFeedback("¡Correcto! Has ganado 50 puntos.");
      onEarnBonus(50);
    } else {
      setQuizFeedback(`Incorrecto. La respuesta era: ${currentQuiz.correctAnswer}`);
    }
    setTimeout(() => {
      setPlayingQuiz(false);
      setQuizFeedback(null);
      setCurrentQuiz(null);
    }, 3000);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-md">
            <h2 className="text-3xl font-black mb-2 flex items-center">
              Centro de Recompensas <Trophy className="ml-3 text-yellow-400" />
            </h2>
            <p className="text-indigo-100 opacity-90">
              Juega minijuegos diarios, aprende sobre el ecosistema y gana bonos reales que puedes convertir a Cripto o retirar vía STP.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
            <div className="flex items-center space-x-4 mb-2">
              <div className="p-3 bg-yellow-400 rounded-2xl text-yellow-900">
                <Star fill="currentColor" size={24} />
              </div>
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-indigo-200">Racha Diaria</p>
                <p className="text-2xl font-black">5 Días</p>
              </div>
            </div>
          </div>
        </div>
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GAME_LIST.map((game) => (
          <div key={game.id} className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-3xl">
                  {game.icon}
                </div>
                <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded-lg text-xs font-bold">
                  +{game.reward} Pts
                </div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">{game.name}</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{game.description}</p>
            </div>
            <button 
              onClick={game.id === 'g1' ? startQuiz : undefined}
              disabled={loadingQuiz}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all flex items-center justify-center space-x-2 shadow-lg shadow-indigo-900/20"
            >
              {loadingQuiz ? <Zap className="animate-pulse" size={18} /> : <Play size={18} fill="currentColor" />}
              <span>{loadingQuiz ? 'Cargando IA...' : 'Jugar Ahora'}</span>
            </button>
          </div>
        ))}
      </div>

      {playingQuiz && currentQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 w-full max-w-lg rounded-[2rem] p-8 border border-slate-800 shadow-2xl">
            {quizFeedback ? (
              <div className="text-center py-8">
                <div className={`text-4xl mb-4 ${quizFeedback.includes('Correcto') ? 'text-green-500' : 'text-red-500'}`}>
                  {quizFeedback.includes('Correcto') ? '🎉' : '❌'}
                </div>
                <h3 className="text-2xl font-bold text-white">{quizFeedback}</h3>
                <p className="text-slate-400 mt-4 italic">{currentQuiz.explanation}</p>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-3 mb-6">
                  <Brain className="text-indigo-500" />
                  <span className="text-indigo-400 font-bold uppercase text-xs tracking-widest">IA Crypto Quiz</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-8">{currentQuiz.question}</h3>
                <div className="space-y-3">
                  {currentQuiz.options.map((option: string) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className="w-full text-left p-4 bg-slate-800 hover:bg-indigo-600 rounded-xl transition-all border border-slate-700 text-slate-200 font-medium"
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setPlayingQuiz(false)}
                  className="mt-8 w-full py-3 text-slate-500 hover:text-white transition-colors text-sm font-bold"
                >
                  Cancelar partida
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GamesSection;
