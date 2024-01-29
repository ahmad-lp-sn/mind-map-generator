import { Request, Response } from "express";
import { mindMapsService } from "../services";
import { GenerateMindMapReq, MindMapFilter, PaginatedQuery, SearchRequest } from "../types";

export const mindMapsController = {
  generate: async (req: GenerateMindMapReq, res: Response) => {
    const { subject, topic } = req.body;

    const result = await mindMapsService.generate(subject, topic);

    res.status(201).send(result);
  },

  import: async (req: Request, res: Response) => {
    const file = req.files[0];
    const result = await mindMapsService.importFromFile(file);

    res.status(201).send(result);
  },

  getById: async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const mindMap = await mindMapsService.getById(id);

    res.status(200).send(mindMap);
  },

  search: async (req: SearchRequest<PaginatedQuery<MindMapFilter>>, res: Response) => {
    const filter = req.query
    const results = await mindMapsService.search(filter);

    res.status(200).send(results);
  }
};
