import { apiFetch, API_BASE_URL } from '../shared/api';

describe('API Health Check', () => {
    it('should return status ok from /api/health', async () => {
        console.log('API_BASE_URL:', API_BASE_URL);
        const data = await apiFetch<{ status: string }>('/health');
        expect(data).toMatchObject({ status: 'ok' });
    });
});
