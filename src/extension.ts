import * as vscode from 'vscode';
import {doFetch, createFetcher, selectCurrentWorkspace, init, selectAppState} from './fetcher/fetcher';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "fetcher" is now active!');

	init(context);

	let disposable = vscode.commands.registerCommand('fetcher.fetch', () => { doFetch(); });

	let create = vscode.commands.registerCommand('fetcher.create', () => { createFetcher(); });

	let select = vscode.commands.registerCommand('fetcher.workspace', () => { selectCurrentWorkspace(); });

	let state = vscode.commands.registerCommand('fetcher.appState', () => { selectAppState(); });

	context.subscriptions.push(disposable);
	context.subscriptions.push(create);
	context.subscriptions.push(select);
	context.subscriptions.push(state);
}

// This method is called when your extension is deactivated
export function deactivate() {}
