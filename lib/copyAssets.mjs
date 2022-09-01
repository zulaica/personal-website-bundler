#!/usr/bin/env node

import { cp, readdir, stat } from 'fs/promises';
import { EMOJI } from './constants.mjs';
import { reportError } from './shared.mjs';

const copyAssets = async (input, output) => {
  try {
    const assets = await readdir(input);
    console.info(`${EMOJI.cardFileBox}  Copying assets`);

    for (const asset of assets) {
      const stats = await stat(`${input}/${asset}`);

      if (stats.isDirectory() && asset !== 'scripts' && asset !== 'styles') {
        await cp(`${input}/${asset}`, `${output}/${asset}`, {
          recursive: true
        });
        console.info(`   ${EMOJI.cardIndexDividers} ${asset}`);
      }
    }
  } catch (error) {
    reportError(error);
  }
};

export default copyAssets;
