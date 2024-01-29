import { Query } from "@google-cloud/firestore";
import { MindMapFilter, PaginatedQuery } from "../types";
import { BaseRepo } from "./Base";
import { MindMap } from "./entities";

class MindMapsRepo extends BaseRepo<MindMap> {
  constructor() {
    super("mindMap");
  }

  /**
   * add extra methods
   */

  _getFilterQuery(filter: MindMapFilter) {
    let query: Query<MindMap> = this.collection;
    if (filter.ids?.length) {
      query = this.collection.where("id", "in", filter.ids);
    }
    if (filter.topic) {
      query = query
        .orderBy("topic")
        .startAt(filter.topic)
        .endAt(filter.topic + "\uf8ff");
    } else if (filter.subject) {
      // we have to put else if as Firestore doesn't support a single query for multiple "LIKE" operations
      query = query
        .orderBy("subject")
        .startAt(filter.subject)
        .endAt(filter.subject + "\uf8ff");
    }

    return query;
  }

  async find(filter: PaginatedQuery<MindMapFilter>) {
    let query = this._getFilterQuery(filter.filter || {});
    if (filter.offset) query = query.orderBy("id").startAfter(filter.offset);
    if (filter.limit) query = query.limit(filter.limit);

    const result = await query.get();

    return result.docs.map((v) => v.data());
  }

  async count(filter: MindMapFilter) {
    const query = this._getFilterQuery(filter || {});
    const result = await query.count().get();

    return result.data().count;
  }
}

export const mindMapsRepo = new MindMapsRepo();
