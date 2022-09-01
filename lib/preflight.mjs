import { mkdir, readdir, rm } from 'fs/promises';
import { EMOJI } from './constants.mjs';
import { logError, logMessage, updateMessage } from './shared.mjs';

const preflight = async (output) => {
  try {
    const files = await readdir(output);
    logMessage(
      `${EMOJI.wastebasket} Removing old release files (0/${files.length})`
    );
    for (const [index, file] of files.entries()) {
      updateMessage(
        `${EMOJI.wastebasket} Removing old release files (${index + 1}/${
          files.length
        })`
      );
      await rm(`${output}/${file}`, { recursive: true, force: true });
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      logMessage(`${EMOJI.fileFolder} Creating release directory`);
      await mkdir(output);
    } else {
      logError(error);
    }
  } finally {
    logMessage('\n');
  }
};

export default preflight;
