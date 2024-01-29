import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { FILES_ERR } from "../../constants/errors";
import { config } from "../../config";
import { GoogleCloudStorageService } from "./GoogleCloud";
import { IStorageService } from "../../types";

export class StorageService implements IStorageService {
  private static _instance: IStorageService;

  protected constructor() {}

  static get instance() {
    if (!StorageService._instance) {
      switch (config.storage.type) {
        case "GCP":
          StorageService._instance = new GoogleCloudStorageService();
          break;
        default:
          StorageService._instance = new StorageService();
      }
    }

    return StorageService._instance;
  }

  upload(
    content: string,
    filename = `${uuidv4()}.csv`,
    dir = config.storage.folders.files
  ) {
    return new Promise<string>((res, rej) => {
      fs.writeFile(dir + filename, content, (err) => {
        if (err) {
          return rej(err);
        }
        res(filename);
      });
    });
  }

  async get(filename: string) {
    const path = config.storage.folders.files + filename;

    if (!fs.existsSync(path)) {
      throw FILES_ERR.FILE_NOT_FOUND_ERR;
    }

    return fs.createReadStream(path);
  }
}
