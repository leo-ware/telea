import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://teleainsights.com',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://teleainsights.com/about',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://teleainsights.com/about',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://teleainsights.com/contact',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.1,
        },
        {
            url: 'https://teleainsights.com/events',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: 'https://teleainsights.com/people',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://teleainsights.com/careers',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.1,
        },
        {
            url: 'https://teleainsights.com/clients',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://teleainsights.com/work',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ]
}