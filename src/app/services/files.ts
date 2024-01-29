import { StorageService } from "./storage";

export const filesService = {
  get: (filename: string) => StorageService.instance.get(filename),
  save: (content: string) => StorageService.instance.upload(content),
};
