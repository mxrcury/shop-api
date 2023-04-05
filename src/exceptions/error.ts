export class ApiError extends Error {
  statusCode: number;
  errors: string[];
  errorMessage: string;
  error: any;
  constructor(message: string) {
    super(message);
  }
  static ServerError(
    errors?: string[],
    message: string = 'Something went wrong.'
  ) {
    const error = new ApiError(message);
    error.statusCode = 500;
    error.errors = errors;
    error.errorMessage = error.message;

    return error;
  }
  static NotFound(message: string = 'Not found') {
    const error = new ApiError(message);
    error.statusCode = 404;
    error.errors = [];
    error.errorMessage = error.message;

    return error;
  }
  static BadRequest(message: string = 'Bad request.') {
    const error = new ApiError(message);
    error.statusCode = 400;
    error.errorMessage = error.message;
    return error;
  }
  static CastError(error: any) {
    const errorBadRequest = this.ServerError(
      [error],
      `Invalid value ${error.value} of field ${error.path}`
    );
    return errorBadRequest;
  }
  static UnAuthorized() {
    const error = new ApiError('You are not authorized');
    error.errorMessage = error.message;
    error.statusCode = 401;

    return error;
  }
  static Forbidden() {
    const error = new ApiError(
      `You don't have enough permissions for this action.`
    );
    error.errorMessage = error.message;
    error.statusCode = 403;
    console.log(error);
    return error;
  }
}
