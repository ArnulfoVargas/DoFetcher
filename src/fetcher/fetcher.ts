import { readFileSync, writeFileSync } from 'fs';
import * as vscode from 'vscode';
import DoFetcher from '../types/types';

export const doFetch = async() => {
    const uris = await vscode.workspace.findFiles("fetcher.json");
    const fileUri = uris[0];
    if (!fileUri) {
        vscode.window.showErrorMessage("No fetcher.json file was found.");
        return;
    }

    const file = readFileSync(fileUri.fsPath, 'utf-8');
    const data = JSON.parse(file) as DoFetcher;

    if (vscode.workspace.workspaceFolders === undefined) {return;}

    const p = vscode.workspace.workspaceFolders[0].uri;
    const uri = vscode.Uri.joinPath(p, "fetchResults.json");
    writeFileSync(uri.fsPath, JSON.stringify(data, null, 4));
};

export const createFetcher = () => {
    if (vscode.workspace.workspaceFolders === undefined) {return;}

    const p = vscode.workspace.workspaceFolders[0].uri;
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