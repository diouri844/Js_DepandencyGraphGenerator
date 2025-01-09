
import { readdir } from 'fs/promises';
import * as fs from 'fs';
import { join } from 'path';
import { ScanneResult } from '../types/scanne';

async function scanDirectory(directory: string):Promise<ScanneResult[]> {
    const files = await readdir(directory, { withFileTypes: false });
    const result: ScanneResult[] = [];
    for (const file of files) {
        if (file.startsWith('.') || file === 'node_modules') {
            continue;
        }
        const filePath = join(directory, file);
        const stat = await fs.promises.stat(filePath);
        if (stat.isDirectory()) {
            const subfiles = await scanDirectory(filePath);
            //console.log(filePath, subfiles);
            result.push({ type: 'directory', path: filePath, files: subfiles });
        } else {
            result.push({ type: 'file', path: filePath, files:null });
        }
    }
    return result;
}

export { scanDirectory };