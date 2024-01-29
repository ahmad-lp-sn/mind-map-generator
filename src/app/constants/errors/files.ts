import { CustomError } from "../../helpers";

const FILES_ERROR_CODE = "002";

export const FILE_NOT_FOUND_ERR = new CustomError({
    _code: FILES_ERROR_CODE + "001",
    message: "file not found",
    status: 404,
})
