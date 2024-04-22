import * as vscode from "vscode";

export const checkError = (currentWorkSpaceFolder : vscode.WorkspaceFolder) => {
    if (vscode.workspace.workspaceFolders === undefined) {
        vscode.window.showErrorMessage("Open a project.");
        return true;
    }
    if (currentWorkSpaceFolder === undefined) {
        vscode.window.showErrorMessage("Select a Workspace folder.");
        return true;
    }
    return false;
};