import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

interface HeaderProps {
    cartCount: number;
    onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onSearch }) => {
    const { theme, setTheme } = useTheme();
    const [search, setSearch] = React.useState('');

    return (
        <header className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <button className="md:hidden" aria-label="Open menu">
                    <span className="material-icons">menu</span>
                </button>
                <Link href="/" className="font-bold text-lg">Shop</Link>
            </div>
            <form
                data-testid="search-form"
                className="flex-1 mx-4 max-w-md"
                onSubmit={e => {
                    e.preventDefault();
                    onSearch(search);
                }}
            >
                <input
                    type="search"
                    className="w-full rounded px-3 py-1 border dark:bg-gray-800"
                    placeholder="Search products..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    aria-label="Search products"
                />
            </form>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    aria-label="Toggle theme"
                >
                    <span className="material-icons">
                        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                    </span>
                </button>
                <Link href="/cart" className="relative" aria-label="Cart">
                    <span className="material-icons">shopping_cart</span>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-2 bg-red-500 text-xs text-white rounded-full px-1">
                            {cartCount}
                        </span>
                    )}
                </Link>
            </div>
        </header>
    );
};

export default Header;
