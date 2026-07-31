import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Assumes the script is in maha-films/scripts/ and assets are in ../../assets
const sourceDir = path.resolve(__dirname, '../../assets');
const targetDir = path.resolve(__dirname, '../public');

async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function copyFile(src, dest) {
  await fs.copyFile(src, dest);
  console.log(`Copied ${path.basename(src)} to ${path.relative(targetDir, dest)}`);
}

async function main() {
  const dirs = {
    logos: path.join(targetDir, 'logos'),
    team: path.join(targetDir, 'team'),
    reviews: path.join(targetDir, 'reviews'),
    sets: path.join(targetDir, 'sets'),
    imgSeq: path.join(targetDir, 'img-seq')
  };

  for (const dir of Object.values(dirs)) {
    await ensureDir(dir);
  }

  const files = await fs.readdir(sourceDir);
  
  for (const file of files) {
    const srcPath = path.join(sourceDir, file);
    const stat = await fs.stat(srcPath);

    if (stat.isDirectory()) {
      if (file === 'img_seq') {
        const seqFiles = await fs.readdir(srcPath);
        for (const seqFile of seqFiles) {
          if (seqFile.match(/\.(jpg|jpeg|png)$/i)) {
            // Extract the number from ezgif-frame-001.jpg
            const match = seqFile.match(/\d+/);
            if (match) {
              const numStr = match[0].padStart(3, '0');
              const newName = `frame-${numStr}.webp`;
              const seqSrc = path.join(srcPath, seqFile);
              const seqDest = path.join(dirs.imgSeq, newName);
              
              await sharp(seqSrc)
                .webp({ quality: 75 })
                .toFile(seqDest);
                
              console.log(`Converted img_seq/${seqFile} to img-seq/${newName}`);
            }
          }
        }
      }
      continue;
    }

    if (file === 'logo.png' || file.startsWith('client-')) {
      await copyFile(srcPath, path.join(dirs.logos, file));
    } else if (file.startsWith('team-')) {
      await copyFile(srcPath, path.join(dirs.team, file));
    } else if (file.startsWith('review-')) {
      await copyFile(srcPath, path.join(dirs.reviews, file));
    } else if (file.startsWith('set-')) {
      await copyFile(srcPath, path.join(dirs.sets, file));
    } else {
      // hero.jpg and anything else
      await copyFile(srcPath, path.join(targetDir, file));
    }
  }
  
  console.log('Conversion and copying complete!');
}

main().catch(console.error);
