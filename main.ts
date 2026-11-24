// Everyday Things, Two Lines — school bus as a yellow whale.
// Writes exactly two lines to /output/entry.txt.
// Line 1: one vivid sentence explaining a school bus to a 10-year-old
//   through a single concrete analogy (bus = whale).
// Line 2: one sentence on why the analogy works — what it maps
//   (swallow a crowd whole, carry it elsewhere) and what it leaves out
//   (whales swim and digest; a bus has a driver, seats, a door).
// Deterministic, stdlib only, no network.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE1 =
  "A school bus is a yellow whale that swallows 40 kids every morning, carries them across town in its belly, and spits them out at school without ever chewing.";
const LINE2 =
  "It works because both swallow a crowd whole and carry it somewhere else, but a real whale swims in the sea and digests what it eats, while the bus has a driver, seats, and a door that opens.";

const entry = `${LINE1}\n${LINE2}\n`;

// Hardening: fail loudly instead of shipping an entry that breaks the
// gate (UTF-8, 1-400 chars, exactly 2 lines, 1 sentence per line).
const lines = entry.trimEnd().split("\n");
if (entry.length < 1 || entry.length > 400) {
  throw new Error(`entry length ${entry.length} outside gate 1-400`);
}
if (lines.length !== 2) {
  throw new Error(`expected 2 lines, got ${lines.length}`);
}
for (const line of lines) {
  if ((line.match(/\./g) ?? []).length !== 1) {
    throw new Error(`each line must be exactly one sentence: ${line}`);
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");
