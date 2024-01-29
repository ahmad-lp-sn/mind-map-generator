import { NextFunction } from "express";
import { config } from "../config";
import { PaginatedQuery, SearchRequest } from "../types";

export const pagination = <T = never>(
  req: SearchRequest<PaginatedQuery<T>>,
  _,
  next: NextFunction
) => {
  req.query.limit = +req.query.limit || config.defaultPageSize;

  next();
};
