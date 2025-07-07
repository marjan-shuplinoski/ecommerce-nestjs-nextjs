// backend/src/shared/common/__tests__/logger.middleware.spec.ts
import { LoggerMiddleware } from '../logger.middleware';
import { Request, Response, NextFunction } from 'express';

describe('LoggerMiddleware', () => {
  let middleware: LoggerMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let logSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    middleware = new LoggerMiddleware();
    mockNext = jest.fn();

    // Spy on logger methods
    logSpy = jest.spyOn(middleware['logger'], 'log').mockImplementation();
    errorSpy = jest.spyOn(middleware['logger'], 'error').mockImplementation();
    warnSpy = jest.spyOn(middleware['logger'], 'warn').mockImplementation();

    mockRequest = {
      method: 'GET',
      url: '/test',
      ip: '127.0.0.1',
      get: jest.fn().mockReturnValue('Test-Agent'),
      headers: {},
    };

    const listeners: Record<string, () => void> = {};
    mockResponse = {
      on: jest.fn().mockImplementation((event: string, callback: () => void) => {
        listeners[event] = callback;
        return mockResponse;
      }),
      get: jest.fn().mockReturnValue('1024'),
      statusCode: 200,
      emit: jest.fn().mockImplementation((event: string) => {
        if (listeners[event]) {
          listeners[event]();
        }
      }),
    };

    // Simulate response finish event
    (mockResponse.on as jest.Mock).mockImplementation((event: string, callback: () => void) => {
      if (event === 'finish') {
        // Call the callback immediately to simulate response finishing
        setTimeout(callback, 0);
      }
      return mockResponse;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should log incoming request', () => {
    middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

    expect(logSpy).toHaveBeenCalledWith(
      'Incoming GET /test',
      expect.stringContaining('"method":"GET"'),
    );
    expect(mockNext).toHaveBeenCalled();
  });

  it('should generate request ID if not present', () => {
    middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockRequest.headers).toHaveProperty('x-request-id');
    expect(typeof mockRequest.headers!['x-request-id']).toBe('string');
  });

  it('should preserve existing request ID', () => {
    mockRequest.headers = { 'x-request-id': 'existing-id' };

    middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockRequest.headers['x-request-id']).toBe('existing-id');
  });

  it('should log successful response', (done) => {
    mockResponse.statusCode = 200;

    middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

    // Trigger the finish event
    setTimeout(() => {
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining('GET /test 200'),
        expect.stringContaining('"statusCode":200'),
      );
      done();
    }, 10);
  });

  it('should log client error response with warn level', (done) => {
    mockResponse.statusCode = 404;

    middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

    setTimeout(() => {
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('GET /test 404'),
        expect.stringContaining('"statusCode":404'),
      );
      done();
    }, 10);
  });

  it('should log server error response with error level', (done) => {
    mockResponse.statusCode = 500;

    middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

    setTimeout(() => {
      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringContaining('GET /test 500'),
        expect.stringContaining('"statusCode":500'),
      );
      done();
    }, 10);
  });

  it('should calculate response time', (done) => {
    const startTime = Date.now();
    jest
      .spyOn(Date, 'now')
      .mockReturnValueOnce(startTime)
      .mockReturnValueOnce(startTime + 100);

    middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

    setTimeout(() => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('100ms'), expect.any(String));
      done();
    }, 10);
  });
});
