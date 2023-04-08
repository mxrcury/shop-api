import express from 'express';
import { ApiError } from '../exceptions/error';
import { ErrorResponse } from '../types/common';

export default (
  err: express.ErrorRequestHandler,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(err);
  }

  const errors = {
    JsonWebTokenError: () => {
      res.status(401).send({
        statusCode: 401,
        status: 'You are not authorized.',
      });
    },
    TokenExpiredError: () => {
      res.status(401).send({
        statusCode: 401,
        status: 'Your token has been expired.',
      });
    },
    CastError: () => {
      res.status(500).send(ApiError.CastError(err));
    },
  };
  if (errors[err.name]) errors[err.name]();

  if (err instanceof ApiError) {
    res.status(err.statusCode).send(createErrorResponse(err));
  }

  if (err instanceof Error) {
    res.status(500).send(createErrorResponse(err));
  }

  next();
};

function createErrorResponse(err: ErrorResponse) {
  return {
    status: err.statusCode || err.status,
    code: err.code || err.code,
    message: err.errorMessage || err.message,
  };
}
