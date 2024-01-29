import fs from "fs";
import { parse } from "csv-parse";
import { stringify } from "csv-stringify";

export const parseCsvFile = (filePath: string, ignoreHeaders = true) => {
  const data: string[][] = [];

  return new Promise<string[][]>((res, rej) => {
    fs.createReadStream(filePath)
      .pipe(parse({ delimiter: ",", from_line: ignoreHeaders ? 2 : 1 }))
      .on("data", (row) => {
        data.push(row);
      })
      .on("close", () => res(data))
      .on("error", (err) => rej(err));
  });
};

export const arrayToCsvStr = (data: string[][]) => {
  return new Promise<string>((res, rej) => {
    stringify(data, (err, output) => {
      if (err) {
        return rej(err);
      }

      res(output);
    });
  });
};
