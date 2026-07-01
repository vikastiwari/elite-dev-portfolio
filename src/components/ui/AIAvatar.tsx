import React from 'react';
import { useStore } from '../../store/useStore';

import { audioEngine } from '../../utils/audioEngine';

export default function AIAvatar() {
  const isHackerMode = useStore(state => state.isHackerMode);
  const toggleHackerMode = useStore(state => state.toggleHackerMode);

  if (isHackerMode) return null; // Hide avatar when terminal is open

  return (
    <div 
      className="fixed bottom-8 right-8 z-50 cursor-pointer group" 
      data-testid="ai-avatar"
      onClick={() => {
        audioEngine.playClick();
        toggleHackerMode();
      }}
      onMouseEnter={() => audioEngine.playHover()}
    >
      <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-dark-800 border-2 border-brand-500 shadow-[0_0_20px_var(--color-brand-500)] overflow-hidden group-hover:scale-110 transition-transform">
        {/* Core pulsing AI eye */}
        <div className="w-4 h-4 bg-brand-400 rounded-full animate-pulse blur-[1px]"></div>
        
        {/* Scanning ring */}
        <div className="absolute inset-0 border border-t-brand-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
      
      {/* Floating text */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-dark-700 text-brand-400 text-xs px-2 py-1 rounded font-mono border border-brand-500/30 group-hover:text-text-primary transition-colors">
        AI ASSISTANT
      </div>
    </div>
  );
}
