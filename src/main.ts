

import process from "process";

import {scanDirectory } from "./scanner/directory";
import { consoleDir } from "./console/directory";
import { ScanneResult } from "./types/scanne";
import { DependencyGraph } from "./types/graph";
import * as fs from "fs";
import { log } from "console";
import { generateGraph } from "./graph/generateGraph";
import { generateDot } from "./dot/generateDot";
import * as path from "path";

// tryin to render all js file in the directory : 



async function main() {
    const args = process.argv.slice(2);
    if (args.length !== 1) {
        console.error('Usage: node main.js <directory>');
        process.exit(1);
    }
    const root = path.isAbsolute(args[0]) ? args[0] : path.resolve(process.cwd(), args[0]);
    const projectName = path.basename(root);
    console.log(projectName);

    try {
        const Parent: ScanneResult = await scanDirectory(root);
        consoleDir(Parent);
        const depGraph: DependencyGraph = generateGraph(Parent);
        const schema: string = generateDot(depGraph);
        fs.writeFileSync("graph.dot", schema);
        return;
    } catch (error) {
        console.error('Error scanning directory:', error);
        return;
    }
}

main();






