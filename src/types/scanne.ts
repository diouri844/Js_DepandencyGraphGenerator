export type ScanneResult ={
    path: string,
    directory: ScanneResult[];
    files: string[];
};