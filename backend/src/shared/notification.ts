// backend/src/shared/notification.ts
import { Injectable } from '@nestjs/common';

export type NotificationType = 'success' | 'warning' | 'error';

export interface Notification {
  type: NotificationType;
  message: string;
  code?: string | number;
}

@Injectable()
export class NotificationService {
  notifySuccess(message: string, code?: string | number): Notification {
    return { type: 'success', message, code };
  }
  notifyWarning(message: string, code?: string | number): Notification {
    return { type: 'warning', message, code };
  }
  notifyError(message: string, code?: string | number): Notification {
    return { type: 'error', message, code };
  }
}
