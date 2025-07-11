import type { Metadata } from 'next';

export const defaultMetadata: Metadata = {
    title: 'Ecommerce App',
    description: 'A modern ecommerce platform.',
    openGraph: {
        title: 'Ecommerce App',
        description: 'A modern ecommerce platform.',
        url: 'https://yourdomain.com',
        siteName: 'Ecommerce App',
        images: [
            {
                url: 'https://yourdomain.com/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Ecommerce App',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: '@yourhandle',
        creator: '@yourhandle',
    },
};
