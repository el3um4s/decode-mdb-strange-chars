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

  const sqlString = `SELECT Ordine, Carattere FROM [test] WHERE [ordine]=${ordine};`;

  // const plain = await runVbs({
  //   vbs,
  //   args: [file, `"${sqlString}"`, "JSON"],
  // });

  // const buf = await runVbsBuffer({
  //   vbs,
  //   args: [file, `"${sqlString}"`, "JSON"],
  // });

  // const r: { type: number; data: number[] } = JSON.parse(
  //   JSON.stringify(buf[0])
  // );
  // console.log(r);
  // const a = r.data.map((x) => x.toString(16).padStart(2, "0")).join(" ");
  // console.log(a);
  // const charW = Buffer.from(a.replaceAll(" ", ""), "hex");

  // console.log(plain);
  // console.log(buf);
  // console.log(`${charW.toString("utf8")}`);

  const sqlOrdine = `SELECT Ordine FROM [test] WHERE [ordine]=${ordine};`;
  const sqlCarattere = `SELECT Carattere FROM [test] WHERE [ordine]=${ordine};`;

  const bufOrdine = await runVbsBuffer({
    vbs,
    args: [file, `"${sqlOrdine}"`, "JSON"],
  });
  const bufCarattere = await runVbsBuffer({
    vbs,
    args: [file, `"${sqlCarattere}"`, "JSON"],
  });

  const rOrdine: { type: number; data: number[] } = JSON.parse(
    JSON.stringify(bufOrdine[0])
  );
  const rCarattere: { type: number; data: number[] } = JSON.parse(
    JSON.stringify(bufCarattere[0])
  );

  const codeOrdine = rOrdine.data
    .map((x) => x.toString(16).padStart(2, "0"))
    .join(" ");

  const codeCarattere = rCarattere.data
    .map((x) => x.toString(16).padStart(2, "0"))
    .join(" ");

  // const charW = Buffer.from(a.replaceAll(" ", ""), "hex");

  // console.log(plain);
  // console.log(buf);
  console.log(codeOrdine);

  // const ordineString =
  //   "7b 22 72 65 73 75 6c 74 22 3a 5b 7b 22 4f 72 64 69 6e 65 22 3a 20 22";
  const carattereString =
    "7b 22 72 65 73 75 6c 74 22 3a 5b 7b 22 43 61 72 61 74 74 65 72 65 22 3a 20 22";
  const fineString = "22 7d 5d 7d 0d 0a";

  // const codiceAccess = codeOrdine
  //   .replace(ordineString, "")
  //   .replace(fineString, "");
  // console.log(`${Buffer.from(codiceAccess.replaceAll(" ", ""), "hex")}`);

  const codiceAccess = codeCarattere
    .replace(carattereString, "")
    .replace(fineString, "");
  console.log(`${Buffer.from(codiceAccess.replaceAll(" ", ""), "hex")}`);

  return codiceAccess;
};
