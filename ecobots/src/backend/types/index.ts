import { Request } from 'express';

// Extend the Request interface to include the custom property
export interface AuthenticatedRequest extends Request {
    device_uuid?: string;
}
  