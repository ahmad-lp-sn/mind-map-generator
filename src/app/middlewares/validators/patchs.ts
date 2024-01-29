import Joi from "joi";
import { validator } from "./validator";
import { PaginatedQuery } from "../../types";
import { paginated } from "./common";

const searchReqSchema = Joi.object<PaginatedQuery>(paginated);

export const patchsValidators = {
  searchReqSchema: validator(searchReqSchema),
};
