import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AIAvatar from '../src/components/ui/AIAvatar';
import HackerTerminal from '../src/components/terminal/HackerTerminal';
import KeyboardManager from '../src/components/KeyboardManager';
import { useStore } from '../src/store/useStore';
import '@testing-library/jest-dom';

// Mock xterm
let xtermCb: any = null;
vi.mock('@xterm/xterm', () => {
  return {
    Terminal: class {
      loadAddon() {}
      open() {}
      writeln() {}
      write() {}
      dispose() {}
      onData(cb: any) { xtermCb = cb; }
      attachCustomKeyEventHandler() {}
      clear() {}
    }
  };
});

// Mock fetch
global.fetch = vi.fn().mockResolvedValue({
  json: () => Promise.resolve({ reply: 'Mock reply' })
});

vi.mock('@xterm/addon-fit', () => ({
  FitAddon: class {
    fit() {}
  }
}));

// Helper to trigger xterm
const triggerXtermData = async (data: string) => {
  if (xtermCb) {
    const result = xtermCb(data);
    if (result instanceof Promise) {
      await result;
    }
  }
};

describe('Terminal & Avatar Components', () => {
  beforeEach(() => {
    useStore.setState({ isHackerMode: false });
  });

  it('renders AIAvatar when hacker mode is off', () => {
    const { getByTestId } = render(<AIAvatar />);
    expect(getByTestId('ai-avatar')).toBeInTheDocument();
  });

  it('hides AIAvatar when hacker mode is on', () => {
    useStore.setState({ isHackerMode: true });
    const { queryByTestId } = render(<AIAvatar />);
    expect(queryByTestId('ai-avatar')).not.toBeInTheDocument();
  });

  it('hides HackerTerminal by default', () => {
    const { queryByTestId } = render(<HackerTerminal />);
    expect(queryByTestId('hacker-terminal')).not.toBeInTheDocument();
  });

  it('renders HackerTerminal when hacker mode is on', () => {
    useStore.setState({ isHackerMode: true });
    const { getByTestId } = render(<HackerTerminal />);
    expect(getByTestId('hacker-terminal')).toBeInTheDocument();
  });

  it('KeyboardManager toggles hacker mode via CTRL + `', () => {
    render(<KeyboardManager />);
    expect(useStore.getState().isHackerMode).toBe(false);

    // Test a non-matching key to cover the negative branch
    fireEvent.keyDown(window, { key: 'a', ctrlKey: true });
    expect(useStore.getState().isHackerMode).toBe(false);

    // Test the matching key
    fireEvent.keyDown(window, { key: '`', ctrlKey: true });
    expect(useStore.getState().isHackerMode).toBe(true);
  });

  it('HackerTerminal handles input and commands', async () => {
    useStore.setState({ isHackerMode: true });
    render(<HackerTerminal />);
    
    // Simulate typing "help" + Enter
    await triggerXtermData('h');
    await triggerXtermData('e');
    await triggerXtermData('l');
    await triggerXtermData('p');
    await triggerXtermData('\r'); // trigger enter
    
    // Simulate typing "clear" + Enter
    await triggerXtermData('c');
    await triggerXtermData('l');
    await triggerXtermData('e');
    await triggerXtermData('a');
    await triggerXtermData('r');
    await triggerXtermData('\r');
    
    // Simulate typing "whoami" + Enter
    await triggerXtermData('w');
    await triggerXtermData('h');
    await triggerXtermData('o');
    await triggerXtermData('a');
    await triggerXtermData('m');
    await triggerXtermData('i');
    await triggerXtermData('\r');

    // Simulate backspace
    await triggerXtermData('a');
    await triggerXtermData('\u007F'); // backspace

    // Simulate fetch error
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));
    await triggerXtermData('a');
    await triggerXtermData('\r');
    
    expect(global.fetch).toHaveBeenCalled();
  });
});
