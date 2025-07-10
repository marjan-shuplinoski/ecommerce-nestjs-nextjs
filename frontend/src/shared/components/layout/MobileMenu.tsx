import React from 'react';
import Link from 'next/link';

interface MobileMenuProps {
    open: boolean;
    onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose }) => {
    if (!open) return null;
    return (
        <nav className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
            <div className="bg-white dark:bg-gray-900 w-64 h-full p-4">
                <button onClick={onClose} aria-label="Close menu" className="mb-4">
                    <span className="material-icons">close</span>
                </button>
                <ul className="space-y-4">
                    <li><Link href="/" onClick={onClose}>Home</Link></li>
                    <li><Link href="/products" onClick={onClose}>Products</Link></li>
                    <li><Link href="/cart" onClick={onClose}>Cart</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default MobileMenu;
