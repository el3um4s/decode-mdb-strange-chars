import { getAccessCodeAllChars } from "./queryMDB";

import * as fs from "fs";

const myCustomFunction = (name: string): string => `Hello ${name}`;
function ciao(name: string): string {
  return `Ciao ${name}`;
}

export { myCustomFunction, ciao };

const result = async () => {
  const r = await getAccessCodeAllChars();
};

result();
