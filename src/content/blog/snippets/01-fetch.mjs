// start-0
const response = await fetch("https://en.wikipedia.org/wiki/Jarrow_March");

console.log(`${response.status} ${response.statusText}\n`);

console.log("## Headers");
for (const header of response.headers.entries()) {
  console.log(header.join(": "));
}
// end-0
// start-1
console.log("\n## Body");
let chunkIndex = 0;
for await (const chunk of response.body) {
  console.log(`Received chunk ${chunkIndex++} with ${chunk.length} bytes.`);
}
// end-1
