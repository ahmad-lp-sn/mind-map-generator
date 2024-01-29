import { Request, Response } from "express";
import { filesService } from "../services";

export const filesController = {
  get: async (req: Request<{ filename: string }>, res: Response) => {
    const { filename } = req.params;

    const filestream = await filesService.get(filename);

    res.setHeader("Content-disposition", "attachment; filename=" + filename);

    filestream.pipe(res);
  },
};
