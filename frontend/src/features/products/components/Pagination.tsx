import React from 'react';

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

/**
 * Pagination component for navigating product pages.
 * Accessible, keyboard-navigable, strictly typed.
 */
export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
    return (
        <nav aria-label="Pagination" className="flex justify-center mt-6" data-testid="pagination">
            <button
                className="px-3 py-1 mx-1 rounded border disabled:opacity-50"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                &lt;
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
                <button
                    key={i}
                    className={`px-3 py-1 mx-1 rounded border ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => onPageChange(i + 1)}
                    aria-current={currentPage === i + 1 ? 'page' : undefined}
                    aria-label={`Go to page ${i + 1}`}
                >
                    {i + 1}
                </button>
            ))}
            <button
                className="px-3 py-1 mx-1 rounded border disabled:opacity-50"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                data-testid="next-page-btn"
            >
                &gt;
            </button>
        </nav>
    );
};

export default Pagination;
