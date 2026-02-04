/**
 * test scenario for Loading component
 *
 * - Loading component
 *   - should render LoadingBar component
 *
 * @vitest-environment jsdom
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import Loading from './Loading';

// mock react-redux-loading-bar
vi.mock('react-redux-loading-bar', () => ({
  default: () => <div data-testid="loading-bar" />,
}));

describe('Loading component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render LoadingBar component', () => {
    // arrange
    render(<Loading />);

    // assert
    const loadingBar = screen.getByTestId('loading-bar');
    expect(loadingBar).toBeInTheDocument();
  });
});
