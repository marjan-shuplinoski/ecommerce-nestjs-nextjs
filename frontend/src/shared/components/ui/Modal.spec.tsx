import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './Modal';

describe('Modal', () => {
  it('renders children when open', () => {
    render(
      <Modal open onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Modal open={false} onClose={jest.fn()}>
        <div>Should not be visible</div>
      </Modal>
    );
    expect(screen.queryByText('Should not be visible')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <Modal open onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );
    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when overlay is clicked', () => {
    const onClose = jest.fn();
    render(
      <Modal open onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );
    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  it('is accessible with close button', () => {
    render(
      <Modal open onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });
});
