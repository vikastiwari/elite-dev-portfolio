import { create } from 'zustand';

interface PortfolioState {
  isRecruiterMode: boolean;
  activeThemeId: string;
  setRecruiterMode: (mode: boolean) => void;
  setTheme: (themeId: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  isRecruiterMode: false,
  activeThemeId: 'cyberpunk',
  setRecruiterMode: (mode) => set({ isRecruiterMode: mode }),
  setTheme: (themeId) => set({ activeThemeId: themeId })
}));
