import { CustomError } from "../../helpers";

const PATCH_ERROR_CODE = "003";

export const PATCH_NOT_FOUND_ERR = new CustomError({
  _code: PATCH_ERROR_CODE + "001",
  message: "patch not found",
  status: 404,
});
