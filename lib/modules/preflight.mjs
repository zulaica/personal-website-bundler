import { mkdir, readdir, rm } from 'fs/promises';
import { EMOJI, logError, logMessage } from '../helpers/index.mjs';

const preflight = async (output) => {
  try {
    const files = await readdir(output);

    if (files.length) {
      logMessage(
        `${EMOJI.wastebasket} Removing old ${output} files (0/${files.length})`
      );
      for (const [index, file] of files.entries()) {
        logMessage(
          `${EMOJI.wastebasket} Removing old ${output} files (${index + 1}/${
            files.length
          })`,
          true
        );
        await rm(`${output}/${file}`, { recursive: true, force: true });
      }
      logMessage('\n');
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      logMessage(`${EMOJI.fileFolder} Creating ${output} directory\n`);
      await mkdir(output);
    } else {
      logError(`${error} \n`);
    }
  }
};

export default preflight;
