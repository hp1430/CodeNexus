import { StatusCodes } from 'http-status-codes';

import { customErrorResponse } from '../utils/common/responseObjects.js';

export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      console.error('Validation error:', error);
      let explanation = [];
      let errorMessage = '';
      error?.issues?.forEach((err) => {
        explanation.push(err.path[0] + ' ' + err.message);
        errorMessage += ' : ' + err.path[0] + ' ' + err.message;
      });
      res.status(StatusCodes.BAD_REQUEST).json(
        customErrorResponse({
          message: 'Validation Error ' + errorMessage,
          explanation: explanation
        })
      );
    }
  };
};
