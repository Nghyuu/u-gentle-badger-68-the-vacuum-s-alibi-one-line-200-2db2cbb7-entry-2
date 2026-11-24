import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve paths relative to this script's own directory, never process.cwd().
const dir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(dir, "output");

const entry = readFileSync(join(dir, "entry.txt"));
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, entry);
// Deterministic byte-for-byte copy: confirm the written file matches.
if (!readFileSync(outPath).equals(entry)) {
  throw new Error("entry.txt copy mismatch");
}
