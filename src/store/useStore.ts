import { create } from 'zustand';

interface PortfolioState {
  themeIndex: number;
  isLoaderDismissed: boolean;
  activeProject: string | null;
  isHackerMode: boolean;
  isFocusMode: boolean;
  isGameActive: boolean;
  setThemeIndex: (index: number) => void;
  dismissLoader: () => void;
  setActiveProject: (projectId: string | null) => void;
  toggleHackerMode: () => void;
  toggleFocusMode: () => void;
  toggleGameMode: () => void;
}

export const useStore = create<PortfolioState>((set) => ({
  themeIndex: 0,
  isLoaderDismissed: false,
  activeProject: null,
  isHackerMode: false,
  isFocusMode: false,
  isGameActive: false,
  setThemeIndex: (index) => set({ themeIndex: index }),
  dismissLoader: () => set({ isLoaderDismissed: true }),
  setActiveProject: (projectId) => set({ activeProject: projectId }),
  toggleHackerMode: () => set((state) => ({ isHackerMode: !state.isHackerMode })),
  toggleFocusMode: () => set((state) => ({ isFocusMode: !state.isFocusMode })),
  toggleGameMode: () => set((state) => ({ isGameActive: !state.isGameActive })),
}));
