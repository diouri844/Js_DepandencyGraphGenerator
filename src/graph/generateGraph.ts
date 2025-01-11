import path from "path";
import { DependencyGraph } from "../types/graph";
import { ScanneResult } from "../types/scanne";

export function generateGraph(scanResult: ScanneResult): DependencyGraph {
    const graph: DependencyGraph = {};

    function traverse(result: ScanneResult, parent: string | null) {
        let currentPath = result.path;
        if(currentPath.includes(path.sep)){
            currentPath = currentPath.split(path.sep)[1];
        }
        graph[currentPath] = result.files;

        for (const subDir of result.directory) {
            traverse(subDir,null);
        }
    }

    traverse(scanResult, null);
    return graph;
}