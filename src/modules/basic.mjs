import { createReadStream, createWriteStream, writeFile } from 'fs';
import { parse, resolve } from 'path';
import { unlink, rename } from 'node:fs/promises';
import { getDestinations, displayCurrDir, isFile, isDirectory, checkFileExt, displayErrMsg } from "../utils/helpers.mjs"
import { ERROR_WRONG_PATH, ERROR_STREAM_HANDLING, ERROR_WRONG_FILENAME } from '../utils/constants.mjs';

export const handleCat = async (line) => {
    try {
        const [ pathToFile ] = getDestinations(line);

        if (!(await isFile(pathToFile))) { throw new Error(ERROR_WRONG_PATH); }

        const rS = createReadStream(pathToFile);

        rS.on('open', () => {
            console.log('---Start reading file---')
        });
        rS.on('error', () => { throw new Error(ERROR_STREAM_HANDLING); });
        rS.on('data', data => {
            let str = data?.toString();
            console.log(str);
        });
        rS.on('end', () => {
            console.log('--------------------');
            displayCurrDir();
        });
    }
    catch (err) { displayErrMsg(err); }
}

export const handleAdd = async (line) => {
    try {
        const [ pathToFile ] = getDestinations(line);

        if (!checkFileExt(pathToFile)) { throw new Error(ERROR_WRONG_FILENAME); }

        writeFile(pathToFile, '', (err) => {
            if (err) throw new Error(ERROR_STREAM_HANDLING);;

            console.log('File was succesfully created!');
            displayCurrDir();
        });
    }
    catch (err) { displayErrMsg(err); }
}

export const handleRm = async (line) => {
    try {
        const [ pathToFile ] = getDestinations(line);

        if (!(await isFile(pathToFile))) { throw new Error(ERROR_WRONG_PATH); }

        await unlink(pathToFile);

        console.log('File was succesfully deleted!');
        displayCurrDir();
    }
    catch (err) { displayErrMsg(err); }
}

export const handleCp = async (line) => {
    try {
        const [ pathToFile, pathToDest ] = getDestinations(line);

        if (!(await isFile(pathToFile)) || !(await isDirectory(pathToDest))) {
            throw new Error(ERROR_WRONG_PATH); 
        }

        const { base, name, ext } = parse(pathToFile);
        const copiedFileName = `${name}_copy${ext}`;

        const rS = createReadStream(pathToFile);
        const wS = createWriteStream(resolve(pathToDest, copiedFileName));

        rS.pipe(wS);

        rS.on('error', () => { throw new Error(ERROR_STREAM_HANDLING); });

        rS.on('end', () => {
            console.log(`File ${base} was succesfully copied!`);
            displayCurrDir();
        });

    }
    catch (err) { displayErrMsg(err); }
}

export const handleMv = async (line) => {
    try {
        const [ pathToFile, pathToDest ] = getDestinations(line);

        if (!(await isFile(pathToFile)) || !(await isDirectory(pathToDest))) { 
            throw new Error(ERROR_WRONG_PATH);
        }

        const { base } = parse(pathToFile);

        const rS = createReadStream(pathToFile);
        const wS = createWriteStream(resolve(pathToDest, base));

        rS.pipe(wS);
        rS.on('error', err => { throw new Error(err); });
        rS.on('end', async () => {
            await unlink(pathToFile);
            console.log(`File ${base} was succesfully moved!`);
            displayCurrDir();
        });

    }
    catch (err) { displayErrMsg(err); }
}

export const handleRn = async (line) => {
    try {
        const [ pathToFile, newFilename ] = getDestinations(line);

        if (!(await isFile(pathToFile))) { throw new Error(ERROR_WRONG_PATH); }
        if (!checkFileExt(newFilename)) { throw new Error(ERROR_WRONG_FILENAME); }

        await rename(pathToFile, newFilename);

        console.log(`File ${pathToFile} was succesfully renamed!`);
        displayCurrDir();
    }
    catch (err) { displayErrMsg(err); }
}