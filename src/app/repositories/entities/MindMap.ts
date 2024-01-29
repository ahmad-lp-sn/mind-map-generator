import { Base } from "./Base";

export interface MindMapData {
  name: string;
  branches?: MindMapData[];
}

export interface MindMap extends Base {
  subject: string;
  topic: string;
  map: MindMapData;
}
