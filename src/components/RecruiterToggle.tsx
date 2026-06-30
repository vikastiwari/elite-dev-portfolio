import React, { useEffect } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { ShieldAlert, Terminal } from 'lucide-react';

export default function RecruiterToggle() {
  const { isRecruiterMode, setRecruiterMode } = usePortfolioStore();

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('portfolio-state-change', { detail: { isRecruiterMode } }));
  }, [isRecruiterMode]);

  return (
    <button
      onClick={() => setRecruiterMode(!isRecruiterMode)}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 border-2 rounded shadow-lg backdrop-blur-md"
      style={{
        backgroundColor: isRecruiterMode ? 'rgba(239, 68, 68, 0.9)' : 'rgba(16, 185, 129, 0.9)',
        borderColor: isRecruiterMode ? '#b91c1c' : '#059669',
      }}
    >
      {isRecruiterMode ? (
        <>
          <Terminal size={18} />
          Launch WebGL Experience
        </>
      ) : (
        <>
          <ShieldAlert size={18} />
          Recruiter Mode (No WebGL)
        </>
      )}
    </button>
  );
}
