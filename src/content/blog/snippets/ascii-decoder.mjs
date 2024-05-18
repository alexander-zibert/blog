const bytes = new Uint8Array([
  39, 72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33, 39, 32, 119,
  105, 116, 104, 32, 97, 115, 99, 105, 105, 32, 101, 110, 99, 111, 100, 105,
  110, 103, 46,
]);

const decoder = new TextDecoder("ascii");
const decodedBytes = decoder.decode(bytes);

console.log(
  `Decoded ${bytes.byteLength} bytes to ${decodedBytes.length} characters.`
);
console.log("Encoded Bytes:", bytes);
console.log("Decoded String:", decodedBytes);
