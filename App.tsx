import React, { useState } from 'react';
import FloatingHearts from './components/FloatingHearts';
import ProposalCard from './components/ProposalCard';
import { generateLovePoem } from './services/geminiService';
import { AppState } from './types';
import { Crown, Share2, CheckCircle2, Music, BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.PROPOSAL);
  const [poem, setPoem] = useState<string>('The ink is still wet on the announcement...');
  const [loadingPoem, setLoadingPoem] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const name = "Eviii";

  const handleAccept = async () => {
    setAppState(AppState.SUCCESS);
    setLoadingPoem(true);
    try {
      const generatedPoem = await generateLovePoem(name);
      setPoem(generatedPoem);
    } catch (err) {
      console.error(err);
      setPoem(`Dearest Miss ${name},\n\nYou are the diamond of the season. My heart is yours entirely.\n\nYours Truly,\nYour Valentine`);
    } finally {
      setLoadingPoem(false);
    }
  };

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (e) {
      alert("Link ready for the Ton! " + window.location.href);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative bg-[#A7C7E7] overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <FloatingHearts />
      
      {showToast && (
        <div className="fixed top-8 z-50 animate-in fade-in slide-in-from-top-8 duration-300">
          <div className="bg-[#fdf5e6] paper-texture border-2 border-[#D4AF37] px-8 py-3 rounded-none shadow-2xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="font-serif-bold text-slate-800">The news is ready for the Ton! Link copied. ❤️</p>
          </div>
        </div>
      )}

      {appState === AppState.PROPOSAL ? (
        <ProposalCard name={name} onAccept={handleAccept} />
      ) : (
        <div className="z-10 w-full max-w-2xl bg-[#fdf5e6] paper-texture rounded-sm shadow-2xl p-1 gold-border animate-in zoom-in-95 duration-1000">
          <div className="border border-[#D4AF37] p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full py-2 bg-slate-900 text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] font-bold">
              Special Society Edition
            </div>
            
            <div className="flex justify-center gap-6 mb-8 mt-6">
               <Crown className="w-10 h-10 text-[#D4AF37] animate-bounce" />
            </div>

            <h1 className="text-5xl md:text-6xl font-cursive text-slate-900 mb-2">A Match of the Season!</h1>
            <p className="text-[#D4AF37] font-serif uppercase tracking-[0.3em] text-xs mb-10">Lady Whistledown's Society Paper</p>
            
            <div className="bg-white/60 p-6 md:p-10 border border-[#D4AF37]/20 relative mb-10 shadow-inner min-h-[200px] flex items-center justify-center">
              <div className="absolute top-4 left-4 text-slate-200">
                 <BookOpen className="w-12 h-12 opacity-50" />
              </div>
              {loadingPoem ? (
                <div className="space-y-4 py-8 w-full">
                  <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4 mx-auto"></div>
                  <div className="h-4 bg-slate-200 rounded animate-pulse w-5/6 mx-auto"></div>
                  <div className="h-4 bg-slate-200 rounded animate-pulse w-2/3 mx-auto"></div>
                </div>
              ) : (
                <p className="text-2xl md:text-3xl font-serif italic text-slate-800 whitespace-pre-wrap leading-relaxed px-4">
                  {poem}
                </p>
              )}
            </div>

            <div className="space-y-6">
              <div className="flex justify-center items-center gap-3 text-slate-500 font-serif">
                <Music className="w-5 h-5 text-[#A7C7E7]" />
                <span className="italic">"Dearest {name}, does one have plans for a promenade today?"</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <span className="border border-[#D4AF37] px-4 py-1 text-[10px] font-bold uppercase text-[#D4AF37]">#DiamondOfMySeason</span>
                <span className="border border-[#D4AF37] px-4 py-1 text-[10px] font-bold uppercase text-[#D4AF37]">#IncurablySmitten</span>
              </div>
            </div>

            <button 
              onClick={() => window.location.reload()}
              className="mt-12 text-[#D4AF37] hover:text-slate-900 text-xs font-serif uppercase tracking-widest transition-colors block mx-auto underline decoration-[#D4AF37] underline-offset-4"
            >
              Re-read the announcement
            </button>
          </div>
        </div>
      )}

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="fixed bottom-8 right-8 z-40 p-5 bg-slate-900 text-[#D4AF37] rounded-full shadow-2xl transition-all hover:scale-110 border-2 border-[#D4AF37] group"
        aria-label="Share the news"
      >
        <Share2 className="w-6 h-6" />
        <span className="absolute inset-0 rounded-full bg-[#D4AF37] animate-ping opacity-10 pointer-events-none"></span>
      </button>

      {/* Decorative Icons */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center gap-12 opacity-30 pointer-events-none text-2xl grayscale contrast-125">
          <span>🎻</span>
          <span>👒</span>
          <span>💎</span>
          <span>💌</span>
      </div>
    </div>
  );
};

export default App;