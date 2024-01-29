import Joi from "joi";
import { validator } from "./validator";
import { MindMapFilter, PaginatedQuery } from "../../types";
import { paginated } from "./common";

const generateReqSchema = Joi.object({
  body: Joi.object({
    subject: Joi.string().required(),
    topic: Joi.string().required(),
  }).required(),
});

const mindMapFilterSchema = Joi.object<MindMapFilter>({
  subject: Joi.string(),
  topic: Joi.string(),
  ids: Joi.array().items(Joi.string()),
}).xor("subject", "topic");

const searchReqSchema = Joi.object<PaginatedQuery<MindMapFilter>>({
  ...paginated,
  filter: mindMapFilterSchema,
});

export const mindMapsValidators = {
  generate: validator(generateReqSchema),
  searchReqSchema: validator(searchReqSchema),
};
