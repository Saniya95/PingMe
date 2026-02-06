import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(process.cwd(), 'public', 'icons');
const source = path.join(root, 'source.png');

const targets = [
  { name: 'icon-32.png', size: 32 },
  { name: 'icon-64.png', size: 64 },
  { name: 'icon-180.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
];

async function main() {
  if (!fs.existsSync(source)) {
    console.error(`[icons] Missing source image: ${source}`);
    console.error('Place your base PNG at public/icons/source.png and rerun.');
    process.exit(1);
  }

  const buf = await fs.promises.readFile(source);
  await Promise.all(
    targets.map(async ({ name, size }) => {
      const out = path.join(root, name);
      await sharp(buf)
        .resize(size, size, { fit: 'cover' })
        .png({ quality: 90 })
        .toFile(out);
      console.log(`[icons] Wrote ${name}`);
    })
  );
  console.log('[icons] Done');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
