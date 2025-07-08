import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button, { ButtonVariant } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('applies variant styles', () => {
    render(
      <>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="success">Success</Button>
      </>
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveClass('bg-blue-600');
    expect(buttons[1]).toHaveClass('bg-gray-200');
    expect(buttons[2]).toHaveClass('bg-red-600');
    expect(buttons[3]).toHaveClass('bg-green-600');
  });

  it('passes props to button', () => {
    render(<Button type="submit" aria-label="submit-btn">Submit</Button>);
    const btn = screen.getByRole('button', { name: /submit/i });
    expect(btn).toHaveAttribute('type', 'submit');
    expect(btn).toHaveAttribute('aria-label', 'submit-btn');
  });

  it('handles onClick', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
