import { ServerFieldErrorType } from "@/model/error";


export class FieldUniqueError extends Error {
  name: string = "FieldUniqueError";
  fieldsError: ServerFieldErrorType[];
  data: string[];
  status: number = 400;

  constructor(data: string[], message: string = "FieldUniqueError") {
    super(message);
    this.data = data;
    this.fieldsError = data.map((field) => {
      return {
        field,
        message: `${field.toUpperCase()} Already exists`
      };
    });
  }
}

export class FieldCustomError extends Error {
  name: string = "FieldCustomError";
  fieldsError: ServerFieldErrorType[];
  data: ServerFieldErrorType[];
  status: number = 400;

  constructor(data: ServerFieldErrorType[], message: string = "FieldCustomError") {
    super(message);
    this.data = data;
    this.fieldsError = data;
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
  FieldUniqueError,
  FieldCustomError,
};