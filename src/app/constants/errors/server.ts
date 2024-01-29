import { CustomError } from "../../helpers";

const SERVER_ERROR_CODE = "000";

export const INTERNAL_SERVER_ERR = new CustomError({
  _code: SERVER_ERROR_CODE + "001",
  message: "internal server error",
  status: 500,
});

export const LIMIT_UNEXPECTED_FILE =  new CustomError({
  _code: SERVER_ERROR_CODE + "002",
  message: "limit unexpected file",
  status: 400,
});
