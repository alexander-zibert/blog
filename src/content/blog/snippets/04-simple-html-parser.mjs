import { URL } from "node:url";

import { Parser } from "htmlparser2";

const requestUrl = new URL(
  "https://en.wikipedia.org/wiki/Internet_protocol_suite"
);
const response = await fetch(requestUrl);
const example = await response.text();

const parser = new Parser(
  {
    onopentag(name, attribs) {
      const href = attribs.href || attribs.src;
      if (!href) {
        return;
      }
      if (
        name === "img" ||
        (name === "link" && attribs.rel === "stylesheet") ||
        name === "script"
      ) {
        const url = new URL(href, requestUrl.origin);
        console.log(name, url.href);
      }
    },
  },
  {
    xmlMode: false,
    decodeEntities: true,
    lowerCaseTags: true,
    lowerCaseAttributeNames: true,
  }
);

console.time("parse");
parser.write(example);
parser.end();

console.timeEnd("parse");
