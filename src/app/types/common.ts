import { Request } from "express";
import { ReadStream } from "fs";

export interface IStorageService {
  upload(content: string, filename?: string, dir?: string): Promise<string>;
  get(filename: string): Promise<ReadStream>;
}

export type CommonRepoStatics = {
  getFields(type: "String" | "ObjectId" | "Date"): string[];
};

export type StorageType = "GCP";

export type PaginatedQuery<Filter = never> = {
  filter?: Filter;
  offset: number;
  limit: number;
};

export type CreatRequest<
  Body = never,
  Params = never,
  Query = never,
  Result = Body
> = Request<Params, Body, Result, Query>;

export type SearchRequest<
  Query = PaginatedQuery,
  Body = never,
  Params = never,
  Result = never
> = Request<Params, Body, Result, Query>;
