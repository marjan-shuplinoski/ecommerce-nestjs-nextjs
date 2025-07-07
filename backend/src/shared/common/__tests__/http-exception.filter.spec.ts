// backend/src/shared/common/__tests__/http-exception.filter.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpExceptionFilter } from '../http-exception.filter';
import { NotificationService } from '../../notification';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;
  let notificationService: NotificationService;
  let mockResponse: Partial<Response>;
  let mockRequest: Partial<Request>;
  let mockHost: Partial<ArgumentsHost>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpExceptionFilter,
        {
          provide: NotificationService,
          useValue: {
            notifyError: jest.fn().mockReturnValue({
              type: 'error',
              message: 'Test error',
              code: 'TEST_ERROR',
            }),
            notifyWarning: jest.fn().mockReturnValue({
              type: 'warning',
              message: 'Test warning',
              code: 'TEST_WARNING',
            }),
          },
        },
      ],
    }).compile();

    filter = module.get<HttpExceptionFilter>(HttpExceptionFilter);
    notificationService = module.get<NotificationService>(NotificationService);

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    mockRequest = {
      url: '/test',
      method: 'GET',
      ip: '127.0.0.1',
      headers: {},
    } as Request;

    mockHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    };
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  it('should handle HttpException correctly', () => {
    const exception = new HttpException('Test error', HttpStatus.BAD_REQUEST);

    filter.catch(exception, mockHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        path: '/test',
        method: 'GET',
        notification: expect.objectContaining({
          type: 'warning',
          message: 'Test warning',
        }) as Record<string, unknown>,
      }),
    );
  });

  it('should handle unknown exceptions as internal server error', () => {
    const exception = new Error('Unknown error');

    filter.catch(exception, mockHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 500,
        notification: expect.objectContaining({
          type: 'error',
          message: 'Test error',
        }) as Record<string, unknown>,
      }),
    );
  });

  it('should include request ID when present', () => {
    mockRequest.headers = { 'x-request-id': 'test-request-id' };
    const exception = new HttpException('Test error', HttpStatus.BAD_REQUEST);

    filter.catch(exception, mockHost as ArgumentsHost);

    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        requestId: 'test-request-id',
      }),
    );
  });

  it('should handle validation errors with array messages', () => {
    const exception = new HttpException(
      {
        message: ['Field 1 is required', 'Field 2 is invalid'],
        error: 'Validation failed',
      },
      HttpStatus.BAD_REQUEST,
    );

    const notifyWarningSpy = jest.spyOn(notificationService, 'notifyWarning');

    filter.catch(exception, mockHost as ArgumentsHost);

    expect(notifyWarningSpy).toHaveBeenCalledWith('Field 1 is required, Field 2 is invalid', 400);
  });
});
