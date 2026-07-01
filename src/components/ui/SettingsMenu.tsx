import React, { useState, useEffect } from 'react';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';
import { audioEngine } from '../../utils/audioEngine';
import { useStore } from '../../store/useStore';

export default function SettingsMenu() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const themeIndex = useStore(state => state.themeIndex);
  const setThemeIndex = useStore(state => state.setThemeIndex);
  const [musicTrack, setMusicTrack] = useState<'off' | 'light' | 'intense'>('off');

  useEffect(() => {
    // Check initial state
    setSoundEnabled(audioEngine.enabled);
  }, []);

  const toggleSound = () => {
    audioEngine.enabled = !audioEngine.enabled;
    setSoundEnabled(audioEngine.enabled);
    if (audioEngine.enabled) {
      audioEngine.init();
      audioEngine.playClick();
    } else {
      audioEngine.stopMusic();
      setMusicTrack('off');
    }
  };

  const cycleTheme = () => {
    const nextIndex = (themeIndex + 1) % PORTFOLIO_CONFIG.themeEngine.length;
    setThemeIndex(nextIndex);
    const theme = PORTFOLIO_CONFIG.themeEngine[nextIndex].tokens;
    
    document.documentElement.style.setProperty('--bg-primary', theme.background);
    document.documentElement.style.setProperty('--color-primary', theme.primary);
    document.documentElement.style.setProperty('--color-secondary', theme.surface);
    document.documentElement.style.setProperty('--color-accent', theme.accent);
    
    if (audioEngine.enabled) audioEngine.playHover();
  };

  const cycleMusic = () => {
    if (!audioEngine.enabled) {
      audioEngine.enabled = true;
      setSoundEnabled(true);
      audioEngine.init();
    }

    const nextState = musicTrack === 'off' ? 'light' : musicTrack === 'light' ? 'intense' : 'off';
    setMusicTrack(nextState);

    if (nextState === 'off') {
      audioEngine.stopMusic();
    } else {
      audioEngine.playMusic(nextState);
    }
    
    if (audioEngine.enabled) audioEngine.playClick();
  };

  return (
    <div className="flex items-center gap-2 ml-8 border-l border-white/10 pl-8">
      <button 
        onClick={cycleTheme}
        className="text-slate-400 hover:text-brand-400 transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5"
        title={`Theme: ${PORTFOLIO_CONFIG.themeEngine[themeIndex].name}`}
      >
        <i className="fa-solid fa-palette text-lg"></i>
      </button>
      <button 
        onClick={cycleMusic}
        className={`transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 ${musicTrack !== 'off' ? 'text-brand-400' : 'text-slate-400 hover:text-brand-400'}`}
        title={`Music: ${musicTrack.toUpperCase()}`}
      >
        <i className={`fa-solid text-lg ${musicTrack === 'intense' ? 'fa-music' : musicTrack === 'light' ? 'fa-headphones' : 'fa-play'}`}></i>
      </button>
      <button 
        onClick={toggleSound}
        className={`transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 ${soundEnabled ? 'text-brand-400' : 'text-slate-400 hover:text-brand-400'}`}
        title={soundEnabled ? "SFX: ON" : "SFX: OFF"}
      >
        <i className={`fa-solid text-lg ${soundEnabled ? 'fa-volume-high' : 'fa-volume-xmark'}`}></i>
      </button>
    </div>
  );
}
