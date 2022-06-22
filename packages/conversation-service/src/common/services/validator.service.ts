import * as Joi from 'joi';
import { Injectable } from '@nestjs/common';

import { SchemaValidationError } from '../errors/schema-validation.error';

@Injectable()
export class ValidatorService {
  private buildErrorMessageFromError(errorObject: Joi.ValidationError): string {
    let errorMessage = '';
    for (const error of errorObject.details) {
      errorMessage += error.message;
    }

    return errorMessage;
  }

  async validate(objectSchema: Joi.ObjectSchema<any>, input: any): Promise<any> {
    try {
      await objectSchema.validateAsync(input, { abortEarly: true });
    } catch (validationError) {
      throw new SchemaValidationError(this.buildErrorMessageFromError(validationError));
    }
  }
}
