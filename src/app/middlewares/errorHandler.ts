import { Response } from "express";
import { SERVER_ERR } from "../constants/errors";
import { CustomError, logger } from "../helpers";

export const errorHandler = async (err, _, res: Response, __) => {
  logger.error(err);
  if (err instanceof CustomError) {
    return res.status(err.status).send(err);
  }
  res
    .status(SERVER_ERR.INTERNAL_SERVER_ERR.status)
    .send(SERVER_ERR.INTERNAL_SERVER_ERR.message);
};
