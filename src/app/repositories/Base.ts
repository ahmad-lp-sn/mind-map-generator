import { CollectionReference } from "@google-cloud/firestore";
import { v4 as uuid4 } from "uuid";
import { Base } from "./entities";
import { db } from "./db";

export abstract class BaseRepo<Entity extends Base> {
  private _collection: CollectionReference<Entity>;

  constructor(private _collectionName: string) {
    this._collection = db.collection(
      this._collectionName
    ) as CollectionReference<Entity>;
  }

  get collection() {
    return this._collection;
  }

  get collectionName() {
    return this._collectionName;
  }

  create(data: Entity) {
    return this._collection.add({
      id: uuid4(),
      createdAt: new Date().toISOString(),
      ...data,
    });
  }

  async getById(id: string) {
    const v = await this._collection.where("id", "==", id).get();
    return v.docs[0]?.data();
  }
}
