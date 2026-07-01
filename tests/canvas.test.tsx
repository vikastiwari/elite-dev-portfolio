import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import OrbitalCanvas from '../src/components/canvas/OrbitalCanvas';
import TechForceGraph from '../src/components/canvas/TechForceGraph';
import '@testing-library/jest-dom';

// Mock GSAP
vi.mock('gsap', () => ({
  default: {
    to: vi.fn()
  }
}));

// Mock R3F and Rapier
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: any) => <div data-testid="mock-canvas">{children}</div>,
  useFrame: () => {},
  useThree: () => ({ camera: { position: { x: 0, y: 0, z: 0 } } })
}));

vi.mock('@react-three/drei', () => ({
  Stars: () => <div data-testid="stars" />,
  Icosahedron: ({ children }: any) => <div data-testid="icosahedron">{children}</div>,
  TorusKnot: ({ children }: any) => <div data-testid="torus-knot">{children}</div>,
  PerformanceMonitor: () => <div data-testid="mock-perf-monitor" />,
  Text: ({ children }: any) => <div data-testid="drei-text">{children}</div>
}));

vi.mock('@react-three/rapier', () => ({
  Physics: ({ children }: any) => <div data-testid="mock-physics">{children}</div>,
  InstancedRigidBodies: ({ children }: any) => <div data-testid="mock-rigid-bodies">{children}</div>
}));

vi.mock('react-force-graph-3d', () => ({
  default: () => <div data-testid="mock-force-graph" />
}));

describe('Canvas Components', () => {
  it('renders OrbitalCanvas without crashing', () => {
    const { getByTestId } = render(<OrbitalCanvas />);
    expect(getByTestId('orbital-canvas')).toBeInTheDocument();
  });

  it('renders TechForceGraph without crashing', () => {
    const { getByTestId } = render(<TechForceGraph />);
    expect(getByTestId('tech-force-graph')).toBeInTheDocument();
  });
});
