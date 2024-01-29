import { CustomError } from "../../helpers";

const MIND_MAPS_ERROR_CODE = "001";

export const MIND_MAPS_NOT_FOUND_ERR = new CustomError({
  _code: MIND_MAPS_ERROR_CODE + "001",
  message: "mind maps not found",
  status: 404,
});
