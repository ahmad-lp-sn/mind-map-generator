import { Request, Response } from "express";
import { patchService } from "../services";
import { SearchRequest } from "../types";

export const patchsController = {
  getById: async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const patch = await patchService.getById(id);

    res.status(200).send(patch);
  },

  search: async (req: SearchRequest, res: Response) => {
    const filter = req.query;
    const results = await patchService.search(filter);

    res.status(200).send(results);
  },
};
