
import React, { useState, useCallback } from 'react';
import { Heart, ShieldAlert, Crown, ScrollText, Flower2, Coffee } from 'lucide-react';

interface ProposalCardProps {
  onAccept: () => void;
  name: string;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ onAccept, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [showReasons, setShowReasons] = useState(false);
  const [reasonText, setReasonText] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const moveNoButton = useCallback(() => {
    const x = Math.random() * 260 - 130;
    const y = Math.random() * 260 - 130;
    setNoButtonPos({ x, y });
  }, []);

  const handleFakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reasonText.trim()) return;

    setSubmissionStatus('submitting');
    
    setTimeout(() => {
      setSubmissionStatus('error');
      const scandals = [
        "SCANDAL! The Queen has forbidden any refusals in her court!",
        "Lady Whistledown would find this rejection quite distasteful.",
        "Error: Your suitor's intentions are far too noble to be ignored!",
        "Scandal Alert: A Diamond of your stature must accept this match!",
        `The Prince himself has requested a 'Yes', Miss ${name}.`,
        "Warning: A refusal will lead to a 4-page spread in the Society Papers!",
        "Internal Error: My heart is currently at maximum capacity for your love."
      ];
      setErrorMsg(scandals[Math.floor(Math.random() * scandals.length)]);
    }, 1200);
  };

  if (!isOpen) {
    return (
      <div 
        onClick={() => setIsOpen(true)}
        className="z-10 w-full max-w-sm bg-[#fdf5e6] paper-texture rounded-sm p-1 gold-border shadow-2xl flex flex-col items-center cursor-pointer transform hover:rotate-1 hover:scale-105 transition-all group relative"
      >
        <div className="w-full border border-[#D4AF37] p-12 flex flex-col items-center">
          <div className="w-24 h-24 wax-seal rounded-full mb-8 flex items-center justify-center border-2 border-[#9b1c1c] relative">
            <span className="text-white font-serif-bold text-4xl select-none">{name.charAt(0)}</span>
            <div className="absolute -inset-1 border border-white/20 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-xl md:text-2xl font-serif-bold text-slate-800 mb-2 uppercase tracking-[0.3em]">Confidential</h2>
          <p className="text-[#D4AF37] font-cursive text-3xl">For Miss {name}</p>
          <div className="mt-8 opacity-20 group-hover:opacity-60 transition-opacity">
             <ScrollText className="w-8 h-8 text-slate-400" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full max-w-md bg-[#fdf5e6] paper-texture rounded-sm shadow-2xl p-1 gold-border flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-700">
      <div className="w-full border border-[#D4AF37] p-8 md:p-10 flex flex-col items-center">
        <div className="mb-6">
           <Crown className="w-12 h-12 text-[#D4AF37]" />
        </div>

        <h1 className="text-4xl md:text-5xl font-cursive text-slate-800 mb-4">Dearest Miss {name},</h1>
        <p className="text-xl md:text-2xl font-serif text-slate-700 mb-8 italic leading-relaxed">
          The Ton is abuzz with talk of a perfect match... <br/>
          I find you truly 'tea-riffic'. <br/>
          Will you honor me by being my Valentine?
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-10 relative h-16 w-full">
          <button
            onClick={onAccept}
            className="px-12 py-3 bg-[#A7C7E7] hover:bg-[#8eb3d9] text-slate-800 rounded-none font-serif-bold text-xl shadow-lg border border-[#D4AF37] transform hover:scale-110 transition-all active:scale-95"
          >
            I SHALL! 💍
          </button>

          <button
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            style={{ 
              transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
              position: noButtonPos.x === 0 ? 'relative' : 'absolute',
              zIndex: 50
            }}
            className="px-8 py-3 bg-white/50 text-slate-400 rounded-none font-serif text-lg transition-all duration-200 ease-out border border-slate-200"
          >
            Declined.
          </button>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={() => setShowReasons(!showReasons)}
            className="text-[10px] text-[#D4AF37] hover:text-[#b08d2c] uppercase tracking-widest underline transition-colors"
          >
            {showReasons ? "Wait, my Corset is too tight to refuse!" : "Does the lady have reservations?"}
          </button>
          
          <div className="flex gap-8 opacity-20">
              <Flower2 className="w-4 h-4" />
              <Heart className="w-4 h-4 fill-slate-400" />
              <Coffee className="w-4 h-4" />
          </div>
        </div>

        {showReasons && (
          <div className="mt-8 w-full animate-in slide-in-from-top-4 duration-500">
            <div className="bg-white/40 p-5 border border-[#D4AF37]/30">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-4">Scandal Report Initialized</h3>
              <form onSubmit={handleFakeSubmit} className="space-y-4">
                <textarea
                  value={reasonText}
                  onChange={(e) => {
                      setReasonText(e.target.value);
                      if(submissionStatus === 'error') setSubmissionStatus('idle');
                  }}
                  placeholder="How does one intend to occupy their time today? A promenade?"
                  className="w-full p-3 bg-white/60 border border-[#D4AF37]/20 focus:border-[#D4AF37] outline-none text-slate-700 italic h-24 text-sm"
                />

                <button
                  type="submit"
                  disabled={submissionStatus === 'submitting'}
                  className="w-full py-2 bg-slate-800 text-[#D4AF37] font-serif-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-slate-900 transition-all"
                >
                  {submissionStatus === 'submitting' ? "Calling the Messenger..." : "File Official Refusal"}
                </button>
              </form>

              {submissionStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-900 text-[#fdf5e6] flex items-center gap-4 text-left shadow-2xl border-l-4 border-[#D4AF37]">
                  <ShieldAlert className="w-6 h-6 shrink-0 text-[#D4AF37]" />
                  <p className="text-[11px] leading-snug font-serif uppercase tracking-wider">{errorMsg}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalCard;
