import { cp, readdir } from 'fs/promises';
import { EMOJI, logError, logMessage } from '../helpers/index.mjs';

const copyAssets = async (input, output, files) => {
  try {
    const assets = await readdir(input);
    for (const file in files) {
      assets.splice(assets.indexOf(files[file]), 1);
    }
    logMessage(
      `${EMOJI.cardIndexDividers}  Copying assets (0/${assets.length})`
    );
    for (const [index, asset] of assets.entries()) {
      await cp(`${input}/${asset}`, `${output}/${asset}`, {
        recursive: true
      });
      logMessage(
        `${EMOJI.cardIndexDividers}  Copying assets (${index + 1}/${
          assets.length
        })`,
        true
      );
    }
  } catch (error) {
    logError(error);
  } finally {
    logMessage('\n');
  }
};

export default copyAssets;
