import { PATCH_ERR } from "../constants/errors";
import { patchsRepo } from "../repositories";
import { PaginatedQuery } from "../types";

const getById = async (id: string) => {
  const patch = await patchsRepo.getById(id);

  if (!patch) {
    throw PATCH_ERR.PATCH_NOT_FOUND_ERR;
  }

  return patch;
};

const search = async (filter: PaginatedQuery) => {
  const [data, count] = await Promise.all([
    patchsRepo.find(filter),
    patchsRepo.count(),
  ]);

  return {
    data,
    count,
  };
};

export const patchService = {
  getById,
  search,
};
