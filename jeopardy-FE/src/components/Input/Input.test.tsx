import { render, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Input from './Input';

describe('Input component', () => {
  const mockSetChange = vi.fn();

  it('should render input with correct placeholder and value', () => {
    const mockPlaceholder = 'Enter text here';
    const mockValue = 'Hello, world!';
    const { getByPlaceholderText, getByDisplayValue } = render(
      <Input
        label="test-input"
        placeholder={mockPlaceholder}
        text="Test Input"
        setChange={mockSetChange}
      />,
    );
    const inputElement = getByPlaceholderText(mockPlaceholder);
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: mockValue } });
    const valueElement = getByDisplayValue(mockValue);
    expect(valueElement).toBeInTheDocument();
  });

  it('should call setChange function when input is changed', () => {
    const { getByPlaceholderText } = render(
      <Input
        label="test-input"
        placeholder="Enter text here"
        text="Test Input"
        setChange={mockSetChange}
      />,
    );
    const inputElement = getByPlaceholderText('Enter text here');
    fireEvent.change(inputElement, { target: { value: 'Hello, world!' } });
    expect(mockSetChange).toHaveBeenCalledWith('Hello, world!');
  });
});
