import { decodeString, decodeVBSBuffer } from "../index";
import { runVbsBuffer } from "@el3um4s/run-vbs";
import { sql } from "./sql";

import { dictionaryAccessToUTF8 } from "../functions/dictionaryAccessToUTF8";

import path from "path";

async function getOneRow(ordine: number, type = "JSON") {
  const vbs = sql;
  const file = path.resolve("./src/__tests__/test.mdb");

  const sqlString = `SELECT * FROM [test] WHERE [ordine]=${ordine};`;

  const result = await runVbsBuffer({
    vbs,
    args: [file, `"${sqlString}"`, type],
  });
  return result;
}

describe("decode Buffer", () => {
  test("char à", async () => {
    const result = await getOneRow(157);
    const decoded = decodeVBSBuffer(result);
    expect(decoded.trim()).toBe(
      `{"result":[{"ordine": "157","carattere": "à","utf-8 bytes": "c3 a0","descrizione": "LATIN SMALL LETTER A WITH GRAVE","codice win": "85"}]}`.trim()
    );
  });
});

describe("decode string", () => {
  test.each(dictionaryAccessToUTF8)("char $char --> $win", ({ win, char }) => {
    const result = decodeString(win);
    expect(result).toBe(char);
  });
});
