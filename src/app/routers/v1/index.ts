import { Router } from "express";
import { mindMapsRouter } from "./mindMaps";
import { filesRouter } from "./files";
import { patchsRouter } from "./patchs";

const router = Router();

router.use("/mind-maps", mindMapsRouter);
router.use("/files", filesRouter);
router.use("/patchs", patchsRouter);

export const routerV1 = router;
