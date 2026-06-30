import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RecruiterToggle from './RecruiterToggle';
import { usePortfolioStore } from '../store/usePortfolioStore';

describe('RecruiterToggle Component', () => {
  beforeEach(() => {
    usePortfolioStore.setState({ isRecruiterMode: false });
  });

  it('renders standard mode correctly', () => {
    render(<RecruiterToggle />);
    expect(screen.getByText(/Recruiter Mode \(No WebGL\)/i)).toBeInTheDocument();
  });

  it('toggles mode when clicked', () => {
    render(<RecruiterToggle />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(usePortfolioStore.getState().isRecruiterMode).toBe(true);
  });

  it('emits window event on mode change', () => {
    const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent');
    render(<RecruiterToggle />);
    
    // Simulate initial mount effect
    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'portfolio-state-change' })
    );

    // Simulate click
    fireEvent.click(screen.getByRole('button'));
    expect(dispatchEventSpy).toHaveBeenCalledTimes(2);
    
    dispatchEventSpy.mockRestore();
  });
});
