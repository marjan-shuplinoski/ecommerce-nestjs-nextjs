import { notifyApiError } from './notification.service';

describe('notifyApiError', () => {
    it('handles string error', () => {
        expect(() => notifyApiError('Test error')).not.toThrow();
    });
    it('handles axios error object', () => {
        const error = { response: { data: { message: 'Axios error' } } };
        expect(() => notifyApiError(error)).not.toThrow();
    });
    it('handles generic error object', () => {
        const error = { message: 'Generic error' };
        expect(() => notifyApiError(error)).not.toThrow();
    });
});
