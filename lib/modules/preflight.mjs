import { mkdir, readdir, rm } from 'fs/promises';
import { EMOJI, logError, logMessage } from '../helpers/index.mjs';

const preflight = async (outputDir) => {
  try {
    const files = await readdir(outputDir);

    if (files.length) {
      logMessage(
        `${EMOJI.wastebasket} Removing old ${outputDir} files (0/${files.length})`
      );
      for (const [index, file] of files.entries()) {
        logMessage(
          `${EMOJI.wastebasket} Removing old ${outputDir} files (${index + 1}/${
            files.length
          })`,
          true
        );
        await rm(`${outputDir}/${file}`, { recursive: true, force: true });
      }
      logMessage('\n');
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      logMessage(`${EMOJI.fileFolder} Creating ${outputDir} directory\n`);
      await mkdir(outputDir);
    } else {
      logError(`${error} \n`);
    }
  }
};

export default preflight;
