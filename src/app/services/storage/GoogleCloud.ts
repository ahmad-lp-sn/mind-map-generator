import { Storage, StorageOptions } from "@google-cloud/storage";
import { ReadStream } from "fs";
import { v4 as uuidv4 } from "uuid";
import { config } from "../../config";
import { IStorageService } from "../../types";
import { FILES_ERR } from "../../constants/errors";

export class GoogleCloudStorageService implements IStorageService {
  private _storage: Storage;
  private _bucketName: string;

  constructor(
    op?: StorageOptions,
    bucketName: string = config.storage.GCP.bucketName
  ) {
    this._storage = new Storage({
      ...op,
    });
    this._bucketName = bucketName;
    console.log(bucketName, this._storage);
  }

  upload(
    content: string,
    filename = `${uuidv4()}.csv`,
    dir = config.storage.folders.files
  ) {
    const bucket = this._storage.bucket(this._bucketName);
    const file = bucket.file(dir + filename);

    return new Promise<string>((res, rej) => {
      file.save(content, { contentType: "text/plain" }, (err) => {
        if (err) {
          return rej(err);
        }
        res(filename);
      });
    });
  }

  async get(
    filename: string,
    dir = config.storage.folders.files
  ): Promise<ReadStream> {
    const bucket = this._storage.bucket(this._bucketName);
    const file = bucket.file(dir + filename);
    const [exists] = await file.exists();

    if (!exists) {
      throw FILES_ERR.FILE_NOT_FOUND_ERR;
    }

    return file.createReadStream() as ReadStream;
  }
}
