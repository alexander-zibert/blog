const encoding = {};

const buf = new Uint8Array(256);

for (let i = 0; i < 256; i += 1) {
  buf[i] = i;
}

const decoder = new TextDecoder("big5");

for (let i = 0; i < buf.length; i += 1) {
  const decoded = decoder.decode(buf.subarray(i, i + 1)).charCodeAt(0);
  if (decoded !== 65533 && !encoding[String.fromCharCode(decoded)]) {
    encoding[String.fromCharCode(decoded)] = buf.slice(i, i + 1);
  }
}

const buf2 = new Uint8Array(2 * 2 ** 16);
const dv = new DataView(buf2.buffer);
for (let i = 0; i < 2 * 2 ** 16; i += 2) {
  dv.setUint16(i, i / 2);
}

for (let i = 0; i < buf2.byteLength; i += 2) {
  const decoded = decoder.decode(buf2.subarray(i, i + 2)).charCodeAt(0);
  if (decoded !== 65533 && !encoding[String.fromCharCode(decoded)]) {
    encoding[String.fromCharCode(decoded)] = buf2.slice(i, i + 2);
  }
}

const entries = Object.entries(encoding);
console.log(entries.length);
entries.sort((a, b) => {
  return a[0].charCodeAt(0) - b[0].charCodeAt(0);
});

const out = new Uint8Array(256 + 2 * 2 ** 16);
let outIdx = 0;
for (const [char, bytes] of entries) {
  for (const byte of bytes) {
    out[outIdx++] = byte;
  }
}
const outDecoded = [...decoder.decode(out.subarray(0, outIdx))];
console.log(JSON.stringify(outDecoded));
