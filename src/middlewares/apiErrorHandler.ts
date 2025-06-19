import express from "express";
import HttpStatus from "http-status-codes";

export interface IError {
  status?: number;
  code?: number;
  message?: string;
  details?: string;
  stack?: string;
}
/**
 * NOT_FOUND(404) middleware to catch error response
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 */
export function notFoundErrorHandler(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    error: {
      code: HttpStatus.NOT_FOUND,
      message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
    },
  });
}

/**
 * Generic error response middleware
 *
 * @param  {object}   err
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 */

export function errorHandler(
  err: IError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const statusCode = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
  const code = err.code || statusCode;

  // Prefer `details` if it's a message, else fallback to error.message or default
  const message =
    (typeof err.details === "string" && err.details) ||
    err.message ||
    HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);

  console.error("❌ Error Handler:", {
    status: statusCode,
    code,
    message,
    stack: err.stack,
    details: err.details,
  });

  return res.status(statusCode).json({
    success: false,
    message,
    code,
  });
}
