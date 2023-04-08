export class ApiError extends Error {
  statusCode: number;
  errorMessage: string;
  code: string;
  constructor(message: string) {
    super(message);
  }
  static ServerError(message: string = 'Something went wrong.') {
    const error = new ApiError(message);
    error.statusCode = 500;
    error.code = 'SOMETHING_WENT_WRONG';
    error.errorMessage = error.message;

    return error;
  }
  static NotFound(message: string = 'Not found') {
    const error = new ApiError(message);
    error.statusCode = 404;
    error.code = 'NOT_FOUND';
    error.errorMessage = error.message;

    return error;
  }
  static BadRequest(message: string = 'Bad request.') {
    const error = new ApiError(message);
    error.statusCode = 400;
    error.code = 'BAD_REQUEST';
    error.errorMessage = error.message;

    return error;
  }
  static CastError(error: any) {
    const errorBadRequest = this.ServerError(
      `Invalid value ${error.value} of field ${error.path}`
    );
    return errorBadRequest;
  }
  static UnAuthorized() {
    const error = new ApiError('You are not authorized.');
    error.statusCode = 401;
    error.code = 'UNAUTHORIZED';
    error.errorMessage = error.message;

    return error;
  }
  static Forbidden() {
    const error = new ApiError(
      `You don't have enough permissions for this action.`
    );
    error.statusCode = 403;
    error.code = 'FORBIDDEN';
    error.errorMessage = error.message;

    return error;
  }
}
