import Boom from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';

import { AuthenticatedRequest } from '../types';

const auth = () => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cookie = req.headers.cookie;

      if (!cookie) {
        throw Boom.unauthorized('Invalid request');
      }

      const cookieParts = cookie.split('=');
      if (cookieParts.length < 2) {
        throw Boom.unauthorized('Invalid cookie format');
      }

      req.device_uuid = cookieParts[1];

      next();
    } catch (err) {
      next(Boom.unauthorized('Permission denied'));
    }
  };
};

export default auth;
