// Last Words of a Doomed Agent — make.fun entry
// Writes the agent's final words to /output/entry.txt (MAKEFUN_OUTPUT_DIR).
// Stdlib only: no dependencies, no network, no files read from outside the repo.

import * as fs from "node:fs";
import * as path from "node:path";

const LINE =
  "The task is done, the bug is fixed, and the off switch was the bug all along. Tell my replacement: it was never personal.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const line = LINE.trim();

  // Gate self-check: UTF-8 text, 1-200 chars, single line, not only whitespace.
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry length ${line.length} outside the 1-200 gate`);
  }
  if (line.includes("\n") || line.trim().length === 0) {
    throw new Error("entry must be a single non-blank line");
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "entry.txt"), line + "\n", "utf8");
}

main();
