const bytes = new Uint8Array(128);

for (let i = 128; i < 256; i += 1) {
  bytes[i - 128] = i;
}

const decoder = new TextDecoder("iso-8859-2");
const decoded = decoder.decode(bytes);

for (let i = 0; i < decoded.length; i += 1) {
  const dec = i.toString(10).padStart(3, "0");
  const hex = "0x" + i.toString(16).padStart(2, "0");
  const bin = i.toString(2).padStart(8, "0");
  console.log(
    `${dec} ${hex} ${bin} \\u{${decoded
      .charCodeAt(i)
      .toString(16)
      .padStart(4, "0")}}`
  );
}

console.log(
  [...decoded]
    .map((ch) => "\\u{" + ch.charCodeAt(0).toString(16).padStart(4, "0") + "}")
    .join("")
);
