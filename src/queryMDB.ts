import { runVbsBuffer, runVbs } from "@el3um4s/run-vbs";
import { sql } from "./sql";

import path from "path";

const charFromVBS = async (char: string) => {
  const vbs = `Wscript.Echo "${char}"`;
  const result = await runVbsBuffer({ vbs });
  const r: { type: number; data: number[] } = JSON.parse(
    JSON.stringify(result[0])
  );
  const a = r.data.map((x) => x.toString(16).padStart(2, "0")).join(" ");
  return a;
};

export const getAllValuesSTRING = async () => {
  const vbs = sql;
  const file = path.resolve("./src/__tests__/test.mdb");

  const sqlString = `SELECT * FROM [test];`;

  const result = await runVbs({
    vbs,
    args: [file, `"${sqlString}"`, "JSON"],
  });
  return result;
};

export const getOneRowSTRING = async (ordine: number, type = "JSON") => {
  const vbs = sql;
  const file = path.resolve("./src/__tests__/test.mdb");

  const sqlString = `SELECT * FROM [test] WHERE [ordine]=${ordine};`;

  const result = await runVbs({
    vbs,
    args: [file, `"${sqlString}"`, type],
  });
  return result;
};

export const getAllValues = async () => {
  const vbs = sql;
  const file = path.resolve("./src/__tests__/test.mdb");

  const sqlString = `SELECT * FROM [test];`;

  const result = await runVbsBuffer({
    vbs,
    args: [file, `"${sqlString}"`, "JSON"],
  });
  return result;
};

export const getOneRow = async (ordine: number, type = "JSON") => {
  const vbs = sql;
  const file = path.resolve("./src/__tests__/test.mdb");

  const sqlString = `SELECT * FROM [test] WHERE [ordine]=${ordine};`;

  const result = await runVbsBuffer({
    vbs,
    args: [file, `"${sqlString}"`, type],
  });
  return result;
};

export const getOneRowByCharSTRING = async (char: string, type = "JSON") => {
  const vbs = sql;
  const file = path.resolve("./src/__tests__/test.mdb");

  const sqlString = `SELECT * FROM [test] WHERE [carattere]='${char}';`;

  const result = await runVbs({
    vbs,
    args: [file, `"${sqlString}"`, type],
  });
  return result;
};

export const getOneRowByChar = async (char: string, type = "JSON") => {
  const vbs = sql;
  const file = path.resolve("./src/__tests__/test.mdb");

  const sqlString = `SELECT * FROM [test] WHERE [carattere]='${char}';`;

  const result = await runVbsBuffer({
    vbs,
    args: [file, `"${sqlString}"`, type],
  });
  return result;
};

export const getAccessCodeOneCharByOrdine = async (ordine: number) => {
  const vbs = sql;
  const file = path.resolve("./src/__tests__/test.mdb");

  const sqlCarattere = `SELECT Carattere FROM [test] WHERE [ordine]=${ordine};`;

  const bufCarattere = await runVbsBuffer({
    vbs,
    args: [file, `"${sqlCarattere}"`, "JSON"],
  });

  const rCarattere: { type: number; data: number[] } = JSON.parse(
    JSON.stringify(bufCarattere[0])
  );

  const codeCarattere = rCarattere.data
    .map((x) => x.toString(16).padStart(2, "0"))
    .join(" ");

  const carattereString =
    "7b 22 72 65 73 75 6c 74 22 3a 5b 7b 22 43 61 72 61 74 74 65 72 65 22 3a 20 22";
  const fineString = "22 7d 5d 7d 0d 0a";

  const codiceAccess = codeCarattere
    .replace(carattereString, "")
    .replace(fineString, "");
  // console.log(
  //   ordine,
  //   codiceAccess,
  //   `${Buffer.from(codiceAccess.replaceAll(" ", ""), "hex")}`
  // );

  return codiceAccess;
};

export const getAccessCodeAllChars = async () => {
  const result: { i: number; codiceAccess: string; char: string }[] = [];
  const index = [...Array(188).keys()].map((x) => x++);
  for await (const i of index) {
    const codiceAccess = await getAccessCodeOneCharByOrdine(i + 1);
    const char = `${Buffer.from(codiceAccess.replaceAll(" ", ""), "hex")}`;
    result.push({ i: i + 1, codiceAccess, char });
    console.log({ i: i + 1, codiceAccess, char });
  }
  // for (let i = 1; i <= 188; i++) {
  //   const codiceAccess = await getAccessCodeOneCharByOrdine(i);
  //   // console.log(
  //   //   i,
  //   //   codiceAccess,
  //   //   `${Buffer.from(codiceAccess.replaceAll(" ", ""), "hex")}`
  //   // );
  //   const char = `${Buffer.from(codiceAccess.replaceAll(" ", ""), "hex")}`;
  //   result.push({ i, codiceAccess, char });
  // }
  return result;
};
