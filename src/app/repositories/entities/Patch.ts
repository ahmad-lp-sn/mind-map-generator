import { Base } from "./Base";

export interface Patch extends Base {
  total: number;
  patchs: number;
  success: number;
  fail: number;
  reportFilename: string;
}
