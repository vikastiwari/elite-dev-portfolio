import React from 'react';
import { useStore } from '../../store/useStore';

export default function AIAvatar() {
  const isHackerMode = useStore(state => state.isHackerMode);

  if (isHackerMode) return null; // Hide avatar when terminal is open

  return (
    <div className="fixed bottom-8 right-8 z-50 pointer-events-none" data-testid="ai-avatar">
      <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 border-2 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)] overflow-hidden">
        {/* Core pulsing AI eye */}
        <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse blur-[1px]"></div>
        
        {/* Scanning ring */}
        <div className="absolute inset-0 border border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
      
      {/* Floating text */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded font-mono border border-cyan-500/30">
        AI ASSISTANT
      </div>
    </div>
  );
}
