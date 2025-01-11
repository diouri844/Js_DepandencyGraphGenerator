import path from "path";
import { DependencyGraph } from "../types/graph";
import { ScanneResult } from "../types/scanne";

export function generateGraph(scanResult: ScanneResult): DependencyGraph {
    const graph: DependencyGraph = {};

    function traverse(result: ScanneResult, parent: string | null) {
        let currentPath = result.path;
        if (currentPath.includes(path.sep)) {
            parent = currentPath.split(path.sep)[0];
            currentPath = currentPath.split(path.sep).slice(1).join(path.sep);
        }
        if (!parent) {
            graph[currentPath] = result.files;
        } else {
            if (!graph[parent]) {
                graph[parent] = [];
            }
            graph[parent].push(currentPath);
            graph[currentPath] = result.files;
        }

        for (const subDir of result.directory) {
            traverse(subDir, currentPath);
        }
    }
    const arr = scanResult.path.split(path.sep);
    const parent = arr[arr.length-1];
    traverse(scanResult, parent);
    return graph;
}