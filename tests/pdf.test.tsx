import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import DownloadResumeButton from '../src/components/ui/DownloadResumeButton';
import '@testing-library/jest-dom';

// Mock the React-PDF library
vi.mock('@react-pdf/renderer', () => {
  return {
    pdf: vi.fn().mockReturnValue({
      toBlob: vi.fn().mockResolvedValue(new Blob(['mock pdf data'], { type: 'application/pdf' }))
    }),
    Document: ({ children }: any) => <div>{children}</div>,
    Page: ({ children }: any) => <div>{children}</div>,
    Text: ({ children }: any) => <span>{children}</span>,
    View: ({ children }: any) => <div>{children}</div>,
    StyleSheet: {
      create: (styles: any) => styles
    }
  };
});

describe('DownloadResumeButton', () => {
  it('renders correctly and has a clickable button', () => {
    // URL.createObjectURL needs to be mocked
    global.URL.createObjectURL = vi.fn(() => 'mock-url');
    global.URL.revokeObjectURL = vi.fn();

    render(<DownloadResumeButton />);
    
    const button = screen.getByTestId('download-resume-btn');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Download PDF');
  });
});
