import { Query } from "@google-cloud/firestore";
import { PaginatedQuery } from "../types";
import { BaseRepo } from "./Base";
import { Patch } from "./entities";

class PatchsRepo extends BaseRepo<Patch> {
  constructor() {
    super("patch");
  }

  async find(filter: PaginatedQuery) {
    let query: Query<Patch> = this.collection;
    if (filter.offset) query = query.orderBy("id").startAfter(filter.offset);
    if (filter.limit) query = query.limit(filter.limit);

    const result = await query.get();

    return result.docs.map((v) => v.data());
  }

  async count() {
    const result = await this.collection.count().get();

    return result.data().count;
  }
}

export const patchsRepo = new PatchsRepo();
