/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Column from './Column';

describe('Column component', () => {
  const mockSetActive = vi.fn();
  const mockSetSelectedQuestion = vi.fn();
  const mockSetIsInputBlocked = vi.fn();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render the column header with the correct category name', async () => {
    render(
      <Column
        category="geography"
        setActive={mockSetActive}
        setSelectedQuestion={mockSetSelectedQuestion}
        setIsInputBlocked={mockSetIsInputBlocked}
      />,
    );

    const columnHeader = await screen.findByText('geography');
    expect(columnHeader).toBeInTheDocument();
  });
});
