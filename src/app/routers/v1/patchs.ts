import { Router } from "express";
import { patchsController } from "../../controllers";
import { pagination, patchsValidators } from "../../middlewares";

const patchsRouter = Router();

patchsRouter.get("/:id", patchsController.getById);
patchsRouter.get(
  "/",
  pagination,
  patchsValidators.searchReqSchema,
  patchsController.search
);

export { patchsRouter };
