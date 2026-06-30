import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export function useKeyboardShortcuts() {
  const toggleHackerMode = useStore(state => state.toggleHackerMode);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Hacker Mode on CTRL + ~ (Backtick)
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        toggleHackerMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleHackerMode]);
}
