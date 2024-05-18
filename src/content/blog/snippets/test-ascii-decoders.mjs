// unique encodings that browsers should support
// according to WHATWG encoding spec: https://encoding.spec.whatwg.org/#names-and-labels
const encodings = [
  // variable-length encodings
  "utf-8",
  "utf-16be",
  "utf-16le",

  // legacy single-byte encodings
  "ibm866",
  "windows-1252", // similar to "iso-8859-1"
  "iso-8859-2",
  "iso-8859-3",
  "iso-8859-4",
  "iso-8859-5",
  "iso-8859-6",
  "iso-8859-7",
  "iso-8859-8",
  "iso-8859-8-i",
  "windows-1254", // similar to "iso-8859-9"
  "iso-8859-10",
  "windows-874", // similar to "iso-8859-11"
  // "iso-8859-12", // missing from WHATWG spec
  "iso-8859-13",
  "iso-8859-14",
  "iso-8859-15",
  // "iso-8859-16", // not supported by Node.js 20
  "koi8-r",
  "koi8-u",
  "macintosh",
  "windows-1250",
  "windows-1251",
  "windows-1253",
  "windows-1255",
  "windows-1256",
  "windows-1257",
  "windows-1258",
  "x-mac-cyrillic",

  // multi-byte Chinese, Japanese, Korean (CJK) encodings
  "gbk",
  "gb18030",
  "big5",
  "euc-jp",
  "iso-2022-jp",
  "shift-jis",
  "euc-kr",
];

function escapeControl(s) {
  return s.replaceAll(/\p{Control}/gu, function replace(ch) {
    return `<Cc ${ch.charCodeAt(0)}>`;
  });
}

const asciiTestBytes = new Uint8Array(128);
for (let i = 0; i < 128; i += 1) {
  asciiTestBytes[i] = i;
}

const expected = new TextDecoder("ascii").decode(asciiTestBytes);

for (const encoding of encodings) {
  const decoder = new TextDecoder(encoding);
  const actual = decoder.decode(asciiTestBytes);

  if (expected !== actual) {
    console.log(`\n## The '${encoding}' decoder does not support ASCII.`);
  }

  for (let i = 0; i < Math.min(expected.length, actual.length); i += 1) {
    if (expected[i] !== actual[i]) {
      console.log(
        `Expected ${escapeControl(
          expected[i]
        )} at position ${i}. Received ${escapeControl(actual[i])}.`
      );
    }
  }
}
