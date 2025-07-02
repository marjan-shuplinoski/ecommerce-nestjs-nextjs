import { NotificationService } from '../notification';

describe('NotificationService', () => {
  let service: NotificationService;
  beforeEach(() => {
    service = new NotificationService();
  });

  it('should return success notification', () => {
    expect(service.notifySuccess('ok')).toEqual({
      type: 'success',
      message: 'ok',
      code: undefined,
    });
  });

  it('should return warning notification', () => {
    expect(service.notifyWarning('warn', 123)).toEqual({
      type: 'warning',
      message: 'warn',
      code: 123,
    });
  });

  it('should return error notification', () => {
    expect(service.notifyError('fail', 'E1')).toEqual({
      type: 'error',
      message: 'fail',
      code: 'E1',
    });
  });
});
