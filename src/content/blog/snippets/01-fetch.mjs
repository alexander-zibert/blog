const response = await fetch(
  "https://en.wikipedia.org/wiki/Internet_protocol_suite"
);

console.log("## Response Status");
console.log(`${response.status} ${response.statusText}\n`);

console.log("\n## Headers");
for (const header of response.headers.entries()) {
  console.log(header.join(": "));
}

console.log("\n## Body (first 1000 characters)");
const body = await response.text();
console.log(body.slice(0, 1000));
