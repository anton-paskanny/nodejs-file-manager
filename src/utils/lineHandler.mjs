import { calculateHash } from '../modules/hash.mjs';
import { handleUp, handleCd, handleLs } from '../modules/nwd.mjs';
import { handleOs } from '../modules/os.mjs';
import { handleCat, handleAdd, handleRm, handleCp, handleMv, handleRn } from '../modules/basic.mjs';
import { zlibHandler } from '../modules/zlib.mjs';
import { ERROR_INPUT } from '../utils/constants.mjs';

export const handleCommandLine = (line, rI) => {
    if (!line) { console.error(ERROR_INPUT); return; };

    const command = line.trim().split(' ')?.[0].toLowerCase();

    switch (command) {
        case ('ls'): {
            handleLs();
            break;
        }
        case ('up'): {
            handleUp();
            break;
        }
        case ('rn'): {
            handleRn(line);
            break;
        }
        case ('rm'): {
            handleRm(line);
            break;
        }
        case ('cat'): {
            handleCat(line);
            break;
        }
        case ('cp'): {
            handleCp(line);
            break;
        }
        case ('mv'): {
            handleMv(line);
            break;
        }
        case ('add'): {
            handleAdd(line);
            break;
        }
        case ('rn'): {
            handleRn(line);
            break;
        }
        case ('cd'): {
            handleCd(line);
            break;
        }
        case ('os'): {
            handleOs(line);
            break;
        }
        case ('hash'): {
            calculateHash(line);
            break;
        }
        case ('compress'): {
            zlibHandler(line, 'c');
            break;
        }
        case ('decompress'): {
            zlibHandler(line, 'd');
            break;
        }
        case ('.exit'): {
            rI.close();
            break;
        }
        default: {
            console.error(ERROR_INPUT);
        }
    }
}