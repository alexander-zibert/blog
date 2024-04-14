const response = await fetch(
  "https://en.wikipedia.org/wiki/Internet_protocol_suite"
);

console.log("## Body Chunks");
let chunkIdx = 0;
for await (const chunk of response.body) {
  console.log(chunkIdx++, chunk.length);
}
