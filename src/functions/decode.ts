import { dictionaryAccessToUTF8 } from "./dictionaryAccessToUTF8";

const charFromBuffer = async (b: string[]): Promise<string> => {
  const str: { type: number; data: number[] } = JSON.parse(
    JSON.stringify(b[0])
  );
  const result = str.data.map((x) => x.toString(16).padStart(2, "0")).join(" ");
  return result;
};

const replaceChars = async (text: string) => {
  let textReplaced = ` ${text} `;
  dictionaryAccessToUTF8.forEach((c) => {
    textReplaced = textReplaced.replaceAll(
      ` ${c.win} `,
      ` ${c.utf.replaceAll(" ", "")} `
    );
  });
  return textReplaced;
};

export const decodeString = async (text: string): Promise<string> => {
  const textReplaced = await replaceChars(text);
  const result = Buffer.from(textReplaced.replaceAll(" ", ""), "hex");
  return result.toString("utf8");
};

export const decodeVBSBuffer = async (buffer: string[]): Promise<string> => {
  const str = await charFromBuffer(buffer);
  const result = await decodeString(str);
  return result;
};
