import { describe, it, expect, beforeEach } from 'vitest';
import { usePortfolioStore } from './usePortfolioStore';

describe('usePortfolioStore', () => {
  beforeEach(() => {
    // Reset state before each test
    usePortfolioStore.setState({ isRecruiterMode: false, activeThemeId: 'cyberpunk' });
  });

  it('should have initial state', () => {
    const state = usePortfolioStore.getState();
    expect(state.isRecruiterMode).toBe(false);
    expect(state.activeThemeId).toBe('cyberpunk');
  });

  it('should toggle recruiter mode', () => {
    usePortfolioStore.getState().setRecruiterMode(true);
    expect(usePortfolioStore.getState().isRecruiterMode).toBe(true);
    
    usePortfolioStore.getState().setRecruiterMode(false);
    expect(usePortfolioStore.getState().isRecruiterMode).toBe(false);
  });

  it('should change the theme', () => {
    usePortfolioStore.getState().setTheme('minimalist');
    expect(usePortfolioStore.getState().activeThemeId).toBe('minimalist');
  });
});
