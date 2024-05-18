import http from "node:http2";
import { Readable, pipeline } from "node:stream";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function* generateHtml() {
  yield `<!DOCTYPE html>
    <html>
    <head>
    <title>Page Title</title>
    </head>
    <body>`;

  for (let i = 0; i < 100; i += 1) {
    for (let ch of `<p>This is sentence ${i}.</p>`) {
      await delay(10);
      yield ch;
    }
  }

  yield `</body></html>`;
}

const server = http.createServer(async function requestListener(req, res) {
  console.log("test");

  res.setHeader("content-type", "text/html; charset=utf-8");
  res.flushHeaders();

  pipeline(Readable.from(generateHtml()), res, function (err) {
    console.log(err);
  });
});
server.listen(8080, () => {
  console.log("Listening on port 8080.");
});
