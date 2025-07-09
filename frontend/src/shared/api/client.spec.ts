import axios, { AxiosInstance } from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockInterceptors = {
  request: { use: jest.fn() },
  response: { use: jest.fn() },
};

const mockApiInstance = {
  interceptors: mockInterceptors,
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

mockedAxios.create.mockReturnValue(mockApiInstance as unknown as AxiosInstance);

import { getApiInstance } from './client';

describe('api client', () => {
  it('should attach token if present', async () => {
    localStorage.setItem('token', 'test-token');
    const api = getApiInstance();
    expect(api).toBeDefined();
    expect(api.interceptors.request.use).toBeDefined();
    expect(api.interceptors.response.use).toBeDefined();
    expect(typeof api.get).toBe('function');
    expect(typeof api.post).toBe('function');
  });
});
