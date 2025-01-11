import { DependencyGraph } from "../types/graph";

export function generateDot(graph: DependencyGraph): string {
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



