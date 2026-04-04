import { StatusCodes } from 'http-status-codes';

class ClientError extends Error {
  constructor(error) {
    super();
    this.name = 'ClientError';
    this.statusCode = error.statusCode || StatusCodes.BAD_REQUEST;
    this.message = error.message;
    this.explanation = error.explanation;
  }
}

export default ClientError;
