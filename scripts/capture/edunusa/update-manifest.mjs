// Read-modify-write of docs/facts/edunusa-media.json: replaces entries whose `file` starts with the
// prefixes in `owned`, keeps everything else (e.g. diagram entries from another agent).
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const path = "docs/facts/edunusa-media.json";
const entries = JSON.parse(process.argv[2] ? readFileSync(process.argv[2], "utf8") : "[]");
const cur = existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : [];
const names = new Set(entries.map((e) => e.file));
const keep = cur.filter((e) => !names.has(e.file));
writeFileSync(path, JSON.stringify([...keep, ...entries], null, 2) + "\n");
console.log(keep.length, "kept,", entries.length, "written");
