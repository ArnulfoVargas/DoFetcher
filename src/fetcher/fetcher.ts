import { readFileSync, writeFileSync, existsSync, watchFile } from 'fs';
import * as vscode from 'vscode';
import DoFetcher from '../types/types';
import { checkError } from './utils';

let currentWorkSpaceFolder : vscode.WorkspaceFolder;
let appContext : vscode.ExtensionContext;
let currentAppState : string;
let appStates : string[] = [];
let fetcher : DoFetcher | undefined = undefined;
let isTracking = false;

export const init = (context : vscode.ExtensionContext) => {
    appContext = context;
    if (vscode.workspace.workspaceFolders?.length === 1) {
        currentWorkSpaceFolder = vscode.workspace.workspaceFolders[0];
    }

    if(appContext.workspaceState.get<string>("c-app-state" ) === undefined) {
        appContext.globalState.update("c-app-state", "Development");
    }
    currentAppState = appContext.globalState.get<string>("c-app-state")!;

    
    findFile();

    const p = generateFetcherPath();
    if (p === null) {return;}
    watchFile(p ,{
        persistent: true,
        interval: 4000,
    }, () => { 
        isTracking = true;
        findFile(); 
    });
    
};

export const doFetch = async() => {
    if (checkError(currentWorkSpaceFolder)) {return;}

    const p = currentWorkSpaceFolder.uri;
    const uri = vscode.Uri.joinPath(p, "fetchResults.json");

    writeFileSync(uri.fsPath, JSON.stringify(fetcher, null, 4));

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
    "app-states": ["Development", "Production"],
    "host"      : "",
    "groups"    : [],
    "get"       : [],
    "post"      : [],
    "put"       : [],
    "delete"    : []
}`);

    vscode.window.showInformationMessage(`File created at: ${uri.fsPath}`);

    if (!isTracking) {
        const p = generateFetcherPath();
        if (p === null) {return;}
        watchFile(p ,{
            persistent: true,
            interval: 4000,
        }, () => { 
            isTracking = true;
            findFile(); 
        });
    }
    findFile();
};

export const selectAppState = async() => {
    if (checkError(currentWorkSpaceFolder)) {return;}

    if (fetcher === undefined || fetcher['app-states'] === undefined || fetcher['app-states'].length < 1) {
        vscode.window.showErrorMessage("Add some AppStates at the fetcher.json");
        storeAppState("Development");
        return;
    }

    vscode.window.showQuickPick(appStates).then(v => {
        if (v === undefined) {return;}

        storeAppState(v);
    });
};

function storeAppState(value: string){
    currentAppState = value;
    appContext.globalState.update("c-app-state", currentAppState);
    vscode.window.showInformationMessage(`App state updated to: ${currentAppState}`);
}

function generateFetcherPath() : string | null {
    const fileUri = vscode.Uri.joinPath(currentWorkSpaceFolder.uri, "fetcher.json");
    if (!existsSync(fileUri.fsPath)) {
        vscode.window.showErrorMessage("No fetcher.json file was found.");
        return null;
    }
    return fileUri.fsPath;
}

function findFile() {
    if (checkError(currentWorkSpaceFolder)) {return;}

    const path = generateFetcherPath();
    if (path === null) {return;}
    const file = readFileSync(path, 'utf-8');
    fetcher = JSON.parse(file) as DoFetcher;
    if (fetcher['app-states'] === undefined || fetcher['app-states'].length < 1) {
        vscode.window.showErrorMessage("Add some AppStates at the fetcher.json");
        storeAppState("Development");
        return;
    } else if (fetcher['app-states'].length === 1){
        storeAppState(fetcher['app-states'][0]);
    }
    appStates = fetcher['app-states'];
}