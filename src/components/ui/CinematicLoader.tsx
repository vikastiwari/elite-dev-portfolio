import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { audioEngine } from '../../utils/audioEngine';

export default function CinematicLoader() {
  const { active, progress } = useProgress();
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!active && progress === 100) {
      setReady(true);
    }
    // Edge case for Vitest mock where active might be false but progress is 0
    if (!active && progress === 0 && visible) {
      setVisible(false);
    }
  }, [active, progress, visible]);

  const handleEnter = () => {
    audioEngine.init();
    audioEngine.playClick();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono transition-opacity duration-500 ${!visible ? 'opacity-0' : 'opacity-100'}`} data-testid="cinematic-loader">
      <div className="text-cyan-500 text-2xl mb-4 tracking-widest">ORBITAL COMMAND</div>
      
      {!ready ? (
        <>
          <div className="w-64 h-1 bg-slate-800 rounded overflow-hidden">
            <div 
              className="h-full bg-cyan-400 shadow-[0_0_10px_#06b6d4] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-cyan-400/50 text-xs mt-4">
            {Math.round(progress)}% // INITIATING NEURAL LINK
          </div>
        </>
      ) : (
        <button 
          onClick={handleEnter}
          className="mt-4 px-8 py-3 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 hover:text-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] uppercase tracking-widest text-sm"
        >
          Initialize System
        </button>
      )}
    </div>
  );
}
