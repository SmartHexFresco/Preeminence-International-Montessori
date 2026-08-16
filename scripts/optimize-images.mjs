import { mkdir, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC_DIR = join(ROOT, "public", "images");
const OUT_DIR = join(SRC_DIR, "optimized");

const MAX_WIDTH = 1600;
const QUALITY = 80;
const EFFORT = 6;

const byName = (a, b) => a.localeCompare(b, undefined, { numeric: true });

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const entries = (await readdir(SRC_DIR)).filter(
    (f) => !f.startsWith(".") && !f.startsWith("optimized")
  );

  const rows = [];

  for (const file of entries.sort(byName)) {
    const inputPath = join(SRC_DIR, file);
    const meta = await sharp(inputPath).metadata();
    const { width } = meta;

    let pipeline = sharp(inputPath);
    if (width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }

    const outName = file.replace(/\.[^.]+$/, "") + ".webp";
    const outPath = join(OUT_DIR, outName);
    await pipeline
      .webp({ quality: QUALITY, effort: EFFORT, alphaQuality: QUALITY - 10 })
      .toFile(outPath);

    const [inSize, outSize] = await Promise.all([
      stat(inputPath),
      stat(outPath),
    ]);

    rows.push({
      file: outName,
      before: inSize.size,
      after: outSize.size,
      width,
    });
  }

  const totalBefore = rows.reduce((s, r) => s + r.before, 0);
  const totalAfter = rows.reduce((s, r) => s + r.after, 0);
  const pct = ((1 - totalAfter / totalBefore) * 100).toFixed(1);

  console.log(
    ["Image", "src w", "Before", "After", "Saved"].join("\t")
  );
  for (const r of rows) {
    const savedPct = ((1 - r.after / r.before) * 100).toFixed(1);
    console.log(
      [
        r.file,
        `${r.width}px`,
        `${kb(r.before)} KB`,
        `${kb(r.after)} KB`,
        `${savedPct}%`,
      ].join("\t")
    );
  }
  console.log(
    `\nTOTAL: ${mb(totalBefore)} MB -> ${mb(totalAfter)} MB  (${pct}% smaller)`
  );
}

const kb = (b) => (b / 1024).toFixed(1);
const mb = (b) => (b / 1024 / 1024).toFixed(2);

main().catch((err) => {
  console.error(err);
  process.exit(1);
});