import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from './useStore';

describe('useStore', () => {
  beforeEach(() => {
    useStore.setState({ isFocusMode: false });
  });

  it('should have initial state', () => {
    const state = useStore.getState();
    expect(state.isFocusMode).toBe(false);
  });

  it('should toggle focus mode', () => {
    useStore.getState().toggleFocusMode();
    expect(useStore.getState().isFocusMode).toBe(true);
    
    useStore.getState().toggleFocusMode();
    expect(useStore.getState().isFocusMode).toBe(false);
  });
});
