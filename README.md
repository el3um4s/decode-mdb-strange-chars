# Decode MDB Strange Chars

A workaround to solve the character decoding problem of .mdb files (MS Access)

NPM link: [@el3um4s/decode-mdb-strange-chars](https://www.npmjs.com/package/@el3um4s/decode-mdb-strange-chars)

### Install and use the package

To use the package in a project:

```bash
npm i @el3um4s/decode-mdb-strange-chars
```

and then in a file:

```ts
import {
  decodeString,
  decodeVBSBuffer,
} from "@el3um4s/decodeString, decodeVBSBuffer";

import { vbs } from "./sql";

const file = path.resolve("./src/__tests__/test.mdb");

const sqlString = `SELECT * FROM [test] WHERE [ordine]=${ordine};`;

const result = await runVbsBuffer({
  vbs,
  args: [file, `"${sqlString}"`, type],
});

const decoded = decodeVBSBuffer(result);
console.log(decoded);
// {"result":[{"ordine": "157","carattere": "à","utf-8 bytes": "c3 a0","descrizione": "LATIN SMALL LETTER A WITH GRAVE","codice win": "85"}]}

const codeAccess = "85";
const decodedChar = decodeString(codeAccess);
console.log(decodedChar);
// à
```

### API

- `decodeString(text: string): string` decode a string of hex code to a string of characters
- `decodeVBSBuffer(buffer: string[]): string` decode a buffer of hex code to a string of characters

### Acknowledgments

Il mio problema: poter leggere i file mdb anche quando sono presenti dei caratteri strani. Questo package è di supporto a [node-mdb](https://github.com/el3um4s/node-mdb). Serve come passaggio intermedio per convertire i caratteri ottenuti da [run-vbs](https://github.com/el3um4s/run-vbs). Lo tengo come package separato per poterlo usare anche in altri progetti. E, sopratutto, per poterlo testare in maniera indipendente e nel contempo mantenere pulito il codice di _node-mdb_.

My problem: reading mdb files even when strange characters are present. This package is meant for [node-mdb](https://github.com/el3um4s/node-mdb). It serves as an intermediate step to convert the characters obtained from [run-vbs](https://github.com/el3um4s/run-vbs). I keep it as a separate package so that I can use it in other projects as well. And, above all, to be able to test it independently and at the same time keep the _node-mdb_ code clean.
