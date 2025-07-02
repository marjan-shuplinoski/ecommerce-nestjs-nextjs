import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://0.0.0.0:5000/api';
        const response = await fetch(`${backendUrl}/health`);
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        res.status(502).json({ status: 'error', message: 'Backend unavailable' });
    }
}
