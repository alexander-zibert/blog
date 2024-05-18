/**
 * @param {string} text
 */
function asciiEncode(text) {
  // since ascii is a sinlge byte encoding,
  // we can just create a buffer with the same length
  const bytes = new Uint8Array(text.length);

  for (let i = 0; i < text.length; i += 1) {
    const code = text.charCodeAt(i);
    if (code >= 128) {
      throw new Error(
        `Cannot ASCII encode the character with code ${code} at position ${i}.`
      );
    }
    bytes[i] = code;
  }

  return bytes;
}

console.log(asciiEncode("¡Hola!"));
