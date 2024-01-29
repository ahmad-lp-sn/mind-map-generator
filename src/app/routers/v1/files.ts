import { Router } from "express";
import { filesController } from "../../controllers";

const filesRouter = Router();

filesRouter.get("/:filename", filesController.get);

export { filesRouter };
