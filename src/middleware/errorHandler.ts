// /middleware/errorHandler.ts
import { ERROR_MESSAGES, ERROR_STATUS } from "../constants/errors";

export const errorHandler = ({ code, error, set }) => {
  let status = ERROR_STATUS.SERVER_ERROR;
  let message = ERROR_MESSAGES.UNEXPECTED_ERROR;

  if (code === "NOT_FOUND") {
    status = ERROR_STATUS.NOT_FOUND;
    message = ERROR_MESSAGES.PATH_NOT_FOUND;
  } else if (error.message === ERROR_MESSAGES.INVALID_POKEMON_ID) {
    status = ERROR_STATUS.BAD_REQUEST;
    message = error.message;
  } else if (error.message === ERROR_MESSAGES.POKEMON_NOT_FOUND) {
    status = ERROR_STATUS.NOT_FOUND;
    message = error.message;
  }

  console.error(`[Error] Status: ${status}, Message: ${message}`);
  set.status = status;
  return { status, error: message };
};
