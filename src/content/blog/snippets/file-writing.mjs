import fs from "node:fs/promises";

const file = await fs.open("test.txt", "w");

for (let i = 1000; i >= 0; i -= 1) {
  file.write(new Uint8Array([i]), { position: i });
}

await file.close();
