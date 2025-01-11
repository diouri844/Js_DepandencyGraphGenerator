
import { readdir } from 'fs/promises';
import * as fs from 'fs';
import path, { join } from 'path';
import { ScanneResult } from '../types/scanne';

export async function scanDirectory(directory: string): Promise<ScanneResult> {
    const files = await readdir(directory, { withFileTypes: true });
    const localFolderName = path.isAbsolute(directory) ? directory : path.resolve(process.cwd(), directory);
    const result: ScanneResult = {
        path: path.basename(localFolderName),
        directory: [],
        files: []
    };
    for (const file of files) {
        if (file.name.startsWith('.') || file.name.endsWith(".pyc")|| file.name === 'node_modules' || file.name === "dist") {
            continue;
        }
        const filePath = join(localFolderName, file.name);
        const stat = await fs.promises.stat(filePath);

        if (stat.isDirectory()) {
            // add this dir to the result : 
            // create subFolder : 
            const subFolder: ScanneResult = await scanDirectory(filePath);
            // call scanDir again for this file dir : 
            result.directory.push(subFolder);
        } else {
            result.files.push(file.name);
        }
    }
    return result;
}
