export type ScanneResult ={
    type: "file" |"directory",
    path: string,
    files: ScanneResult[] |null;
};