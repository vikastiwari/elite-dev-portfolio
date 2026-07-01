import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from '../src/store/useStore';

describe('Zustand Store', () => {
  // Reset store before each test if necessary, though testing pure state changes
  beforeEach(() => {
    useStore.setState({
      theme: 'cyberpunk',
      isLoaderDismissed: false,
      activeProject: null,
      isHackerMode: false
    });
  });

  it('should initialize with default values', () => {
    const state = useStore.getState();
    expect(state.themeIndex).toBe(0);
    expect(state.isLoaderDismissed).toBe(false);
    expect(state.activeProject).toBeNull();
    expect(state.isHackerMode).toBe(false);
  });

  it('should update the theme', () => {
    useStore.getState().setThemeIndex(1);
    expect(useStore.getState().themeIndex).toBe(1);
  });

  it('should dismiss the loader', () => {
    useStore.getState().dismissLoader();
    expect(useStore.getState().isLoaderDismissed).toBe(true);
  });

  it('should set the active project', () => {
    useStore.getState().setActiveProject('proj_hft');
    expect(useStore.getState().activeProject).toBe('proj_hft');
    
    useStore.getState().setActiveProject(null);
    expect(useStore.getState().activeProject).toBeNull();
  });

  it('should toggle hacker mode', () => {
    useStore.getState().toggleHackerMode();
    expect(useStore.getState().isHackerMode).toBe(true);

    useStore.getState().toggleHackerMode();
    expect(useStore.getState().isHackerMode).toBe(false);
  });
});
