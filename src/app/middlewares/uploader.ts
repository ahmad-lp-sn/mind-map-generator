import multer from "multer";
import { config } from "../config";
import { logger } from "../helpers";
import { LIMIT_UNEXPECTED_FILE } from "../constants/errors/server";

const upload = multer({
  limits: { fileSize: config.maxFileSize },
  dest: config.storage.folders.uploads,
});

export const uploader = ({
  name,
  max,
}: { name?: string; max?: number } = {}) => {
  const uploadHandler = name
    ? upload.array(name, max || config.maxNumberOfFilesPerReq)
    : upload.any();
  return async (req, res, next) => {
    return new Promise((resolve, rej) => {
      uploadHandler(req, res, function (err) {
        if (err) {
          if (err.code == "LIMIT_UNEXPECTED_FILE")
            return rej(LIMIT_UNEXPECTED_FILE);
          return rej(err);
        }
        if (!req.files) return resolve(true);
        const files = req.files;
        logger.info(req.files.length, "req.files.length");
        if (!name) {
          req.files = {};
          for (let file of files) {
            req.files[file.fieldname] = file;
          }
        }
        console.log(req.files);
        return resolve(true);
      });
    }).then((v) => next());
  };
};
