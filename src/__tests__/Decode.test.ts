import {
  getAllValuesSTRING,
  getOneRowSTRING,
  getOneRowByCharSTRING,
  getAllValues,
  getOneRow,
  getOneRowByChar,
  getAccessCodeOneCharByOrdine,
} from "./queryMDB";

describe("test vbs is working", () => {
  test("getAllValuesSTRING", async () => {
    const result = await getAllValuesSTRING();
    // console.log(result);
    expect(result).toBeTruthy();
  });

  test("getAllValues", async () => {
    const result = await getAllValues();
    // console.log(result);
    expect(result).toBeTruthy();
  });

  test("getOneRowSTRING", async () => {
    const result = await getOneRowSTRING(1);
    // console.log(result);
    expect(result).toBeTruthy();
  });

  test("getOneRow", async () => {
    const result = await getOneRow(1);
    // console.log(result);
    expect(result).toBeTruthy();
  });

  test("getOneRowByCharSTRING", async () => {
    const result = await getOneRowByCharSTRING("è");
    // console.log(result);
    expect(result).toBeTruthy();
  });

  test("getOneRowByChar", async () => {
    const result = await getOneRowByChar("è");
    // console.log(result);
    expect(result).toBeTruthy();
  });

  test("getAccessCodeOneCharByOrdine", async () => {
    const result = await getAccessCodeOneCharByOrdine(157);
    // console.log(result);
    expect(result).toBeTruthy();
  });
});
