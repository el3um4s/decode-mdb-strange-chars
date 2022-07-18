import { dictionaryAccessToUTF8 } from "./dictionaryAccessToUTF8";

const charFromBuffer = (b: string[]): string => {
  const str: { type: number; data: number[] } = JSON.parse(
    JSON.stringify(b[0])
  );
  const result = str.data.map((x) => x.toString(16).padStart(2, "0")).join(" ");
  return result;
};

const replaceChars = (text: string) => {
  let textReplaced = ` ${text} `;
  dictionaryAccessToUTF8.forEach((c) => {
    textReplaced = textReplaced.replaceAll(
      ` ${c.win} `,
      ` ${c.utf.replaceAll(" ", "")} `
    );
  });
  return textReplaced;
};

export const decodeString = (text: string): string => {
  const textReplaced = replaceChars(text);
  const result = Buffer.from(textReplaced.replaceAll(" ", ""), "hex");
  return result.toString("utf8");
};

export const decodeVBSBuffer = (buffer: string[]): string => {
  const str = charFromBuffer(buffer);
  const result = decodeString(str);
  return result;
};
