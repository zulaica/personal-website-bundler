import { cp, readdir } from 'fs/promises';
import { EMOJI, EXCLUSIONS, logError, logMessage } from '../helpers/index.mjs';

const copyAssets = async (input, output) => {
  const assets = await readdir(input);
  for (const exclusion in EXCLUSIONS) {
    assets.splice(assets.indexOf(exclusion), 1);
  }

  if (assets.length) {
    try {
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
  }
};

export default copyAssets;
