import { arrayToString } from '@/util/array.util';

import HttpMethod from '@/constant/HTTPMethod';

class ApiError {
  public message: string;
  public status: number;

  constructor(message: string, status: number) {
    this.message = message;
    this.status = status;
  }
}

export class DefaultError extends ApiError {
  constructor(message = 'An error happened.') {
    super(message, 400);
  }
}

export class NotImplementedError extends DefaultError {
  constructor() {
    super("This API route hasn't been implemented yet.");
  }
}

export class RessourceNotFoundError extends ApiError {
  constructor(entity = 'Ressource') {
    super(`${entity} not found.`, 404);
  }
}

export class MethodsNotAllowedError extends ApiError {
  constructor(methods: HttpMethod[]) {
    super(`This request only allows ${arrayToString(methods)} methods.`, 405);
  }
}

export default ApiError;
