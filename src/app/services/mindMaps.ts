import { mindMapsPrompts } from "./prompts";
import { ChatSession } from "./openai";
import { arrayToCsvStr, parseCsvFile, validateJsonStr } from "../helpers";
import { config } from "../config";
import { filesService } from "./files";
import { MindMapData, mindMapsRepo, patchsRepo } from "../repositories";
import { MIND_MAPS_ERR } from "../constants/errors";
import { MindMapFilter, PaginatedQuery } from "../types";
import Joi from "joi";

const MIND_MAP_DATA_STRUCTURE_STR = `GeneratedMindMap {
  name: string;
  branches?: GeneratedMindMap[];
};`;

const mindMapDataSchema = Joi.object({
  name: Joi.string().required(),
  branches: Joi.array().items(Joi.link('#mindMapData'))
}).id('mindMapData');;

const validateMindMapJsonStr = (json: string) => {
  const { data, isValid } = validateJsonStr<MindMapData>(json);
  if (!isValid) {
    return { isValid };
  }
  // validate schema
  const validationResult = mindMapDataSchema.validate(data);

  return { data, isValid: !validationResult.error };
};

const generate = async (subject: string, topic: string) => {
  const prompt = mindMapsPrompts.generate(
    subject,
    topic,
    MIND_MAP_DATA_STRUCTURE_STR
  );

  const chatSession = new ChatSession();
  chatSession.push({ role: "user", content: prompt });

  const result = await chatSession.exec();
  const { data, isValid } = validateMindMapJsonStr(result?.content);
  const success = !chatSession.error && isValid;

  const mindMapRef = await mindMapsRepo.create({
    subject,
    topic,
    map: data,
  });

  return {
    success,
    mindMap: (await mindMapRef.get()).data(),
  };
};

const _generatePatch = async (patch: [subject: string, topic: string][]) => {
  const generateRequests = patch.map(([subject, topic]) =>
    generate(subject, topic)
  );

  const results = await Promise.all(generateRequests);

  return results;
};

const importFromFile = async (
  file: Express.Multer.File,
  patchSize: number = config.defaultPatchSize
) => {
  const data = await parseCsvFile(file.path);
  let success = 0;
  let fail = 0;
  const status: [topic: string, status: string][] = [];

  for (let i = 0; i < data.length; i += patchSize) {
    const end = Math.min(data.length, i + patchSize);
    const result = await _generatePatch(
      data.slice(i, end) as Parameters<typeof _generatePatch>[0]
    );

    result.forEach(({ success: _success, mindMap: { topic } }) => {
      status.push([topic, _success ? "Success" : "Failure"]);
      _success ? success++ : fail++;
    });
  }

  const content = await arrayToCsvStr([["topic", "status"], ...status]);
  const reportFilename = await filesService.save(content);

  const patchRef = await patchsRepo.create({
    total: data.length,
    patchs: Math.ceil(data.length / patchSize),
    success,
    fail,
    reportFilename,
  });

  return (await patchRef.get()).data();
};

const getById = async (id: string) => {
  const mindMap = await mindMapsRepo.getById(id);

  if (!mindMap) {
    throw MIND_MAPS_ERR.MIND_MAPS_NOT_FOUND_ERR;
  }

  return mindMap;
};

const search = async (filter: PaginatedQuery<MindMapFilter>) => {
  const [data, count] = await Promise.all([
    mindMapsRepo.find(filter),
    mindMapsRepo.count(filter.filter),
  ]);

  return {
    data,
    count,
  };
};

export const mindMapsService = {
  generate,
  importFromFile,
  getById,
  search,
};
