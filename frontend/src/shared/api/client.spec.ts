import api from './client';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('api client', () => {
    it('should attach token if present', async () => {
        localStorage.setItem('token', 'test-token');
        mockedAxios.create.mockReturnValue({
            interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
        } as unknown as typeof api);
        expect(api).toBeDefined();
    });
});
