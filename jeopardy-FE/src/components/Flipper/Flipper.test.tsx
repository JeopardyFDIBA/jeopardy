import { render, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Flipper from './Flipper';

describe('Flipper component', () => {
  const mockQuestion = {
    id: 1,
    score: 100,
    question: 'What is the capital of France?',
  };
  const mockSetActive = vi.fn();
  const mockSetSelectedQuestion = vi.fn();
  const mockSetIsInputBlocked = vi.fn();

  it('should render the flipper with the correct score', () => {
    const { getByText } = render(
      <Flipper
        id={mockQuestion.id}
        score={mockQuestion.score}
        question={mockQuestion.question}
        category="mockCategory"
        setActive={mockSetActive}
        setSelectedQuestion={mockSetSelectedQuestion}
        setIsInputBlocked={mockSetIsInputBlocked}
      />,
    );
    const scoreElement = getByText(`${mockQuestion.score}$`);
    expect(scoreElement).toBeInTheDocument();
  });

  it('should call setActive, setSelectedQuestion, and setIsInputBlocked when the flipper is clicked', () => {
    const { getByTestId } = render(
      <Flipper
        id={mockQuestion.id}
        score={mockQuestion.score}
        question={mockQuestion.question}
        category="geography"
        setActive={mockSetActive}
        setSelectedQuestion={mockSetSelectedQuestion}
        setIsInputBlocked={mockSetIsInputBlocked}
      />,
    );
    const flipperElement = getByTestId('geography_100');
    fireEvent.click(flipperElement);
    expect(mockSetActive).toHaveBeenCalledWith(true);
    expect(mockSetSelectedQuestion).toHaveBeenCalledWith(mockQuestion);
    expect(mockSetIsInputBlocked).toHaveBeenCalledWith(true);
  });
});
