import https from "node:https";

const requestOptions = {
  hostname: "en.wikipedia.org",
  port: 443,
  path: "/wiki/Internet_protocol_suite",
  method: "GET",
};
const request = https.request(requestOptions);
request.setHeader("user-agent", "nodejs");

request.on("response", async function responseHandler(res) {
  console.log("Status Code:", res.statusCode, res.statusMessage);
  console.log("HTTP Version:", res.httpVersion);
  console.log("\n## Headers");
  console.log(res.headers);

  console.log("\n## Body Chunks");
  let chunkIdx = 0;
  for await (const chunk of res) {
    console.log(chunkIdx++, chunk.length);
  }
});

request.end();
