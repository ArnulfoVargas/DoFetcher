import { readFileSync, writeFileSync, existsSync } from 'fs';
import * as vscode from 'vscode';
import DoFetcher from '../types/types';
import { checkError } from './utils';

let currentWorkSpaceFolder : vscode.WorkspaceFolder;

export const init = () => {
    if (vscode.workspace.workspaceFolders?.length === 1) {
        currentWorkSpaceFolder = vscode.workspace.workspaceFolders[0];
    }
};

export const doFetch = async() => {
    if (checkError(currentWorkSpaceFolder)) {return;}

    const fileUri = vscode.Uri.joinPath(currentWorkSpaceFolder.uri, "fetcher.json");
    if (!existsSync(fileUri.fsPath)) {
        vscode.window.showErrorMessage("No fetcher.json file was found.");
        return;
    }

    const file = readFileSync(fileUri.fsPath, 'utf-8');
    const data = JSON.parse(file) as DoFetcher;

    if (vscode.workspace.workspaceFolders === undefined) {return;}

    const p = currentWorkSpaceFolder.uri;
    const uri = vscode.Uri.joinPath(p, "fetchResults.json");


    writeFileSync(uri.fsPath, JSON.stringify(data, null, 4));

};

export const selectCurrentWorkspace = () => {
    if (vscode.workspace.workspaceFolders === undefined) {
        vscode.window.showErrorMessage("Open a project.");
        return true;
    }
    vscode.window.showWorkspaceFolderPick({
        ignoreFocusOut :true,
        placeHolder: "Select a workspace folder"
    }).then(v => {
        if (v === undefined) { return; }
        currentWorkSpaceFolder = v;

        vscode.window.showInformationMessage(`Selected '${currentWorkSpaceFolder.name}' as workspace.`);
    });
};

export const createFetcher = async() => {
    if (checkError(currentWorkSpaceFolder)) {return;}

    const p = currentWorkSpaceFolder.uri;
    const uri = vscode.Uri.joinPath(p, "fetcher.json");
    writeFileSync(uri.fsPath, `{
    "host"      : "",
    "groups"    : [],
    "get"       : [],
    "post"      : [],
    "put"       : [],
    "delete"    : []
}`);

    vscode.window.showInformationMessage(`File created at: ${uri.fsPath}`);
};