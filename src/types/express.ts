import { Request as ExpressRequest, Response, NextFunction } from 'express';

type User = {
  userId: string;
};

export type Request = ExpressRequest & User;

export { Response, NextFunction };
