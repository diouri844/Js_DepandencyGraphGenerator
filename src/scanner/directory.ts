
import { readdir } from 'fs/promises';
import * as fs from 'fs';
import path, { join } from 'path';
import { ScanneResult } from '../types/scanne';
import { DependencyGraph } from '../types/graph';
//import { DependencyGraph } from '../types/graph';

async function scanDirectory(directory: string): Promise<ScanneResult> {
    const files = await readdir(directory, { withFileTypes: true });
    const result: ScanneResult = {
        path: directory,
        directory: [],
        files: []
    };
    for (const file of files) {
        if (file.name.startsWith('.') || file.name.endsWith(".pyc")|| file.name === 'node_modules' || file.name === "dist") {
            continue;
        }
        const filePath = join(directory, file.name);
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







// function for genarating the graph schema based on scanned directory  : 




function generateDot(graph: DependencyGraph): string {
    let dot = 'digraph G {\n';

    for (const [module, dependencies] of Object.entries(graph)) {
        if (dependencies.length === 0) {
            dot += `  "${module}";\n`;
        } else {
            dependencies.forEach(dep => {
                dot += `  "${module}" -> "${dep}";\n`;
            });
        }
    }

    dot += '}';
    return dot;
}










export { scanDirectory, generateDot};