import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => (
    <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center space-x-2 text-sm">
            {items.map((item, idx) => (
                <li key={item.href} className="flex items-center">
                    {idx > 0 && <span className="mx-2">/</span>}
                    <Link href={item.href} className="hover:underline">
                        {item.label}
                    </Link>
                </li>
            ))}
        </ol>
    </nav>
);

export default Breadcrumb;
