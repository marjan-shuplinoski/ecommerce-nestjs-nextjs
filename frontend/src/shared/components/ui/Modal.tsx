import React from 'react';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      data-testid="modal-overlay"
      onClick={onClose}
    >
      <div
        className="bg-white rounded shadow-lg max-w-lg w-full p-6 relative"
        role="dialog"
        aria-modal="true"
        onClick={e => e.stopPropagation()}
      >
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        <button
          aria-label="Close modal"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
