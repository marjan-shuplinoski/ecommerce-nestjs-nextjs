import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => (
    <footer className="w-full py-4 px-4 bg-gray-100 dark:bg-gray-900 text-center text-sm text-gray-600 dark:text-gray-300 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Shop. All rights reserved.</span>
            <nav className="flex gap-4">
                <Link href="/privacy">Privacy</Link>
                <Link href="/terms">Terms</Link>
                <Link href="/contact">Contact</Link>
            </nav>
        </div>
    </footer>
);

export default Footer;
