const buf = new Uint8Array(256);

for (let i = 0; i < 256; i += 1) {
  buf[i] = i;
}

const encodings = [
  "windows-1252", // superset of iso-8859-1
  "utf-8",
  "iso-8859-2",
  "iso-8859-3",
  "iso-8859-4",
  "iso-8859-5",
  "iso-8859-6",
  "iso-8859-7",
  "iso-8859-8",
  "windows-1254", // superset of iso-8859-9
  "iso-8859-10",
  "windows-874", // superset of iso-8859-11
  // iso-8859-12 seems to be not implemented
  "iso-8859-13",
  "iso-8859-14",
  "iso-8859-15",
  // "iso-8859-16" is specified but does not work
];

function pad(num, obj) {
  if (Number.isInteger(obj)) {
    return obj.toString(16).padStart(num, "0");
  }
  if (typeof obj === "string") {
    return obj.padStart(num, " ");
  }
}

function escape(c) {
  if (c.match(/\p{Mn}/u)) {
    return `   ◌${c}`;
  }
  if (c.match(/\p{White_Space}/u)) {
    return "WS".padStart(4, " ");
  }
  if (c.match(/\p{Control}/u)) {
    return "Cc".padStart(4, " ");
  }
  if (c.match(/\p{Format}/u)) {
    return "Cf".padStart(4, " ");
  }
  return c;
}

const decoders = encodings.map((encoding) => new TextDecoder(encoding));

for (let i = 0; i < 256; i += 1) {
  const sub = buf.subarray(i, i + 1);

  const dec = i.toString().padStart(3, "0");
  const hex = "0x" + i.toString(16).toUpperCase().padStart(2, "0");
  const bin = i.toString(2).padStart(8, "0");
  const unicode = pad(4, escape(String.fromCharCode(i)));

  process.stdout.write(`${dec} ${hex} ${bin} ${unicode}`);

  for (const decoder of decoders) {
    process.stdout.write(` `);

    const decoded = decoder.decode(sub);
    process.stdout.write(pad(4, escape(decoded)));
  }

  process.stdout.write(`\n`);
}
