import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, act } from '@testing-library/react';
import CinematicLoader from '../src/components/ui/CinematicLoader';
import PerformanceManager from '../src/components/canvas/PerformanceManager';
import { audioEngine } from '../src/utils/audioEngine';
import '@testing-library/jest-dom';

// Mock useProgress
let mockProgress = { active: true, progress: 50 };
vi.mock('@react-three/drei', () => ({
  useProgress: () => mockProgress,
  PerformanceMonitor: ({ onIncline, onDecline }: any) => {
    // Expose for testing
    (global as any).triggerIncline = onIncline;
    (global as any).triggerDecline = onDecline;
    return <div data-testid="perf-monitor" />;
  }
}));

// Mock useThree
const mockSetPixelRatio = vi.fn();
vi.mock('@react-three/fiber', () => ({
  useThree: () => ({
    gl: { setPixelRatio: mockSetPixelRatio }
  })
}));

describe('Polish Components', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockProgress = { active: true, progress: 50 };
  });

  it('renders CinematicLoader when active', () => {
    const { getByTestId } = render(<CinematicLoader />);
    expect(getByTestId('cinematic-loader')).toBeInTheDocument();
  });

  it('hides CinematicLoader when Initialize System is clicked', () => {
    mockProgress = { active: false, progress: 100 };
    const { getByText, queryByTestId } = render(<CinematicLoader />);
    
    const button = getByText('Initialize System');
    act(() => {
      button.click();
    });
    
    expect(queryByTestId('cinematic-loader')).not.toBeInTheDocument();
  });

  it('hides immediately in tests when inactive and progress is 0', () => {
    mockProgress = { active: false, progress: 0 };
    const { queryByTestId } = render(<CinematicLoader />);
    expect(queryByTestId('cinematic-loader')).not.toBeInTheDocument();
  });

  it('PerformanceManager inclines and declines pixel ratio', () => {
    render(<PerformanceManager />);
    
    (global as any).triggerIncline();
    expect(mockSetPixelRatio).toHaveBeenCalledWith(Math.min(2, window.devicePixelRatio));
    
    (global as any).triggerDecline();
    expect(mockSetPixelRatio).toHaveBeenCalledWith(1);
  });
});

describe('AudioEngine', () => {
  it('initializes AudioContext and plays sounds safely', () => {
    const mockOscillator = {
      type: '',
      frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn()
    };
    const mockGain = {
      gain: { setValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
      connect: vi.fn()
    };
    const mockAnalyser = {
      fftSize: 0,
      frequencyBinCount: 128,
      getByteFrequencyData: vi.fn()
    };
    
    let time = 100;
    (window as any).AudioContext = class {
      get currentTime() {
        return time++;
      }
      destination = {};
      createOscillator = () => mockOscillator;
      createGain = () => mockGain;
      createAnalyser = () => mockAnalyser;
    };

    audioEngine.init();
    expect(audioEngine.enabled).toBe(true);

    audioEngine.playHover();
    expect(mockOscillator.start).toHaveBeenCalled();

    audioEngine.playClick();
    expect(mockOscillator.start).toHaveBeenCalledTimes(2);
  });

  it('fails gracefully when AudioContext is missing', () => {
    const backup = window.AudioContext;
    delete (window as any).AudioContext;
    delete (window as any).webkitAudioContext;

    const noAudioEngine = new (audioEngine.constructor as any)();
    noAudioEngine.init();
    expect(noAudioEngine.enabled).toBe(false);

    // Should not throw
    noAudioEngine.playHover();
    noAudioEngine.playClick();

    window.AudioContext = backup;
  });
});
