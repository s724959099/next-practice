import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { WrappedResponseType } from "@/model/utils";
import { serverErrorMapping, ServerFieldError } from "@/exceptions/error";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cwServerAction<T extends (...args: any[]) => Promise<any>>(fn: T): (...funcArgs: Parameters<T>) => Promise<WrappedResponseType<ReturnType<T>>> {
  return async (...args: Parameters<T>): Promise<WrappedResponseType<ReturnType<T>>> => {
    const result = await fn(...args);
    if (result.error) {
      const ErrorClass = serverErrorMapping[result.error.name as keyof typeof serverErrorMapping];
      const errorName = result.error.name;
      console.log(result.error.name, ErrorClass instanceof ServerFieldError);
      if (errorName === "ServerFieldError") {
        throw new ErrorClass(result.error.fields);
      } else {
        throw new ErrorClass(result.error.message);
      }
    }
    return result.data;
  };
}