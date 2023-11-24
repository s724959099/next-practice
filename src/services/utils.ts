import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ServerFieldError, ServerUnknownError } from "@/exceptions/error";
import { WrappedResponseType } from "@/model/utils";


export const isFieldError = (error: any) => {
  return error instanceof PrismaClientKnownRequestError && error.code === "P2002" && error.meta?.target && Array.isArray(error.meta.target);
};

export function wrapServerAction<T extends (...args: any[]) => Promise<any>>(fn: T): (...funcArgs: Parameters<T>) => Promise<WrappedResponseType<ReturnType<T>>> {
  return async (...args: Parameters<T>): Promise<WrappedResponseType<ReturnType<T>>> => {
    try {
      const result = await withErrorHandling(fn)(...args);
      return { data: result };
    } catch (error: PrismaClientKnownRequestError | any) {
      // Handle error
      return { error: JSON.parse(JSON.stringify(error)) };
    }
  };
}


export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(fn: T): T {
  return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return await fn(...args);
    } catch (error: PrismaClientKnownRequestError | any) {
      if (isFieldError(error)) {
        throw new ServerFieldError(error.meta.target);
      }
      throw new ServerUnknownError();
    }
  }) as T;
}
