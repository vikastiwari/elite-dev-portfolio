import { create } from 'zustand';

interface PortfolioState {
  theme: string;
  isLoaderDismissed: boolean;
  activeProject: string | null;
  isHackerMode: boolean;
  setTheme: (theme: string) => void;
  dismissLoader: () => void;
  setActiveProject: (projectId: string | null) => void;
  toggleHackerMode: () => void;
}

export const useStore = create<PortfolioState>((set) => ({
  theme: 'cyberpunk', // default theme
  isLoaderDismissed: false,
  activeProject: null,
  isHackerMode: false,
  setTheme: (theme) => set({ theme }),
  dismissLoader: () => set({ isLoaderDismissed: true }),
  setActiveProject: (projectId) => set({ activeProject: projectId }),
  toggleHackerMode: () => set((state) => ({ isHackerMode: !state.isHackerMode })),
}));
