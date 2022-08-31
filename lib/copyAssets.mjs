#!/usr/bin/env node

import { cp, readdir, stat } from 'fs/promises';
import { EMOJI } from './constants.mjs';
import { reportError } from './shared.mjs';

const copyAssets = async () => {
  try {
    const assets = await readdir('source');
    console.info(`${EMOJI.cardFileBox}  Copying assets`);

    for (const asset of assets) {
      const stats = await stat(`source/${asset}`);

      if (stats.isDirectory() && asset !== 'scripts' && asset !== 'styles') {
        await cp(`source/${asset}`, `release/${asset}`, { recursive: true });
        console.info(`   ${EMOJI.cardIndexDividers} ${asset}`);
      }
    }
  } catch (error) {
    reportError(error);
  }
};

export default copyAssets;
