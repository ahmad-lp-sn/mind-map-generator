import { Router } from "express";
import { mindMapsController } from "../../controllers";
import { mindMapsValidators } from "../../middlewares";
import { uploader } from "../../middlewares/uploader";
import { pagination } from "../../middlewares/pagination";

const mindMapsRouter = Router();

mindMapsRouter.post(
  "/generate",
  mindMapsValidators.generate,
  mindMapsController.generate
);

mindMapsRouter.post(
  "/import",
  uploader({ name: "file" }),
  mindMapsController.import
);

mindMapsRouter.get("/:id", mindMapsController.getById);
mindMapsRouter.get(
  "/",
  pagination,
  mindMapsValidators.searchReqSchema,
  mindMapsController.search
);

export { mindMapsRouter };
