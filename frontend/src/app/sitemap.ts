import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://yourdomain.com',
            lastModified: new Date(),
            alternates: {
                languages: {
                    en: 'https://yourdomain.com/en',
                },
            },
        },
        // Add more URLs as needed
    ];
}
