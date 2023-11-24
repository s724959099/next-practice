type ServerFieldErrorType = {
  field: string;
  message: string;
}

export class ServerFieldError extends Error {
  name: string = "ServerFieldError";
  fieldsError: ServerFieldErrorType[];
  fields: string[];
  status: number = 400;

  constructor(fields: string[], message: string = "ServerFieldError") {
    super(message);
    this.fields = fields;
    this.fieldsError = fields.map((field) => {
      return {
        field,
        message: `${field.toUpperCase()} Already exists`
      };
    });
  }
}

export class ServerUnknownError extends Error {
  name = "ServerUnknownError";
  status = 500;
  constructor(message: string = "ServerUnknownError") {
    super(message);
  }
}
export const serverErrorMapping = {
  ServerUnknownError,
  ServerFieldError
}