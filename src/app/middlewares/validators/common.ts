import Joi from 'joi'

export const PositiveInt = (min = 1) => Joi.number().integer().min(min)


export const DateRange = Joi.object({
  $gte: Joi.date(),
  $lte: Joi.date(),
  $gt: Joi.date(),
  $lt: Joi.date(),
})

export const paginated = {
  limit: Joi.number(),
  offset: Joi.number(),
}
