import { HttpException, HttpStatus } from "@nestjs/common";

export * from "./auth.exception";
export * from "./type.exception";
export * from "./connection.exception";

export const CustomError = {
  UnknownError(
    message?: string,
    error?: string,
    statusCode?: number
  ): HttpException {
    return new HttpException(
      {
        message: message || "Something went wrong, please try again later!",
        error: error || "UnknownError",
        statusCode: statusCode || HttpStatus.BAD_GATEWAY,
      },
      HttpStatus.BAD_GATEWAY
    );
  },
};
