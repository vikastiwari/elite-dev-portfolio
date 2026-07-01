import { create } from 'zustand';

interface PortfolioState {
  themeIndex: number;
  isLoaderDismissed: boolean;
  activeProject: string | null;
  isHackerMode: boolean;
  setThemeIndex: (index: number) => void;
  dismissLoader: () => void;
  setActiveProject: (projectId: string | null) => void;
  toggleHackerMode: () => void;
}

export const useStore = create<PortfolioState>((set) => ({
  themeIndex: 0,
  isLoaderDismissed: false,
  activeProject: null,
  isHackerMode: false,
  setThemeIndex: (index) => set({ themeIndex: index }),
  dismissLoader: () => set({ isLoaderDismissed: true }),
  setActiveProject: (projectId) => set({ activeProject: projectId }),
  toggleHackerMode: () => set((state) => ({ isHackerMode: !state.isHackerMode })),
}));
