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

// import {
//   getAllValuesSTRING,
//   getOneRowSTRING,
//   getOneRowByCharSTRING,
//   getAllValues,
//   getOneRow,
//   getOneRowByChar,
//   getAccessCodeOneCharByOrdine,
//   getAccessCodeAllChars,
// } from "./queryMDB";

// describe("test vbs is working", () => {
//   test("getAllValuesSTRING", async () => {
//     const result = await getAllValuesSTRING();
//     // console.log(result);
//     expect(result).toBeTruthy();
//   });

//   test("getAllValues", async () => {
//     const result = await getAllValues();
//     // console.log(result);
//     expect(result).toBeTruthy();
//   });

//   test("getOneRowSTRING", async () => {
//     const result = await getOneRowSTRING(1);
//     // console.log(result);
//     expect(result).toBeTruthy();
//   });

//   test("getOneRow", async () => {
//     const result = await getOneRow(1);
//     // console.log(result);
//     expect(result).toBeTruthy();
//   });

//   test("getOneRowByCharSTRING", async () => {
//     const result = await getOneRowByCharSTRING("è");
//     // console.log(result);
//     expect(result).toBeTruthy();
//   });

//   test("getOneRowByChar", async () => {
//     const result = await getOneRowByChar("è");
//     // console.log(result);
//     expect(result).toBeTruthy();
//   });

//   test("getAccessCodeOneCharByOrdine", async () => {
//     const result = await getAccessCodeOneCharByOrdine(157);
//     // console.log(result);
//     expect(result).toBeTruthy();
//   });

//   test.skip("getAccessCodeAllChars", async () => {
//     const result = await getAccessCodeAllChars();
//     console.log(result);
//     expect(result).toBeTruthy();
//   });
// });
