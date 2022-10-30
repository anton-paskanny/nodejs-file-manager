import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { getDestinations, displayCurrDir } from '../utils/helpers.mjs';
import { ERROR_WRONG_PATH } from '../utils/constants.mjs';

const HANLDERS_MAP = {
    'c': createBrotliCompress,
    'd': createBrotliDecompress,
};

export const zlibHandler = (line, mode) => {
    try {
        const [ pathToFile, pathToDest ] = getDestinations(line);

        if (!(await isFile(pathToFile)) || !(await isDirectory(pathToDest))) {
            throw new Error(ERROR_WRONG_PATH);
        }

        const rS = createReadStream(pathToFile);
        const wS = createWriteStream(pathToDestination);
        const brotli = HANLDERS_MAP[mode]();

        rS.pipe(brotli).pipe(wS);

        displayCurrDir();
    }
    catch (err) { displayErrMsg(err); }
};