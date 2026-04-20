/**
 * ZIP Generation Utilities
 *
 * Creates ZIP bundles for each provider's distribution
 */

import path from 'path';
import { createWriteStream, existsSync, statSync } from 'fs';
import archiver from 'archiver';

/**
 * Create ZIP file for a provider directory
 */
export async function createProviderZip(providerDir, distDir, providerName) {
  const zipFileName = `${providerName}.zip`;
  const zipPath = path.join(distDir, zipFileName);

  if (!existsSync(providerDir)) {
    console.warn(`  Provider directory not found: ${providerDir}`);
    return;
  }

  try {
    await new Promise((resolve, reject) => {
      const output = createWriteStream(zipPath);
      const archive = archiver('zip', { zlib: { level: 9 } });

      output.on('close', resolve);
      archive.on('error', reject);

      archive.pipe(output);
      archive.glob('**/*', {
        cwd: providerDir,
        dot: true,
        ignore: ['**/.DS_Store'],
      });
      archive.finalize();
    });

    const stats = statSync(zipPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`  ${zipFileName} (${sizeMB} MB)`);
  } catch (error) {
    console.error(`  Failed to create ${zipFileName}:`, error.message);
  }
}

/**
 * Create ZIP files for universal bundle
 */
export async function createAllZips(distDir) {
  console.log('\nCreating ZIP bundles...');
  await createProviderZip(path.join(distDir, 'universal'), distDir, 'universal');
}
