import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

vi.mock('react-chartjs-2', () => ({
  Bar: () => React.createElement('div', { 'data-testid': 'mock-bar-chart' }),
  Doughnut: () => React.createElement('div', { 'data-testid': 'mock-doughnut-chart' }),
  Line: () => React.createElement('div', { 'data-testid': 'mock-line-chart' })
}));

vi.mock('chart.js', () => ({
  Chart: {
    register: vi.fn(),
  },
  registerables: [],
}));
