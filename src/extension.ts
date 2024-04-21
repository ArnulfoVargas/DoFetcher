// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {doFetch, createFetcher} from './fetcher/fetcher';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "fetcher" is now active!');

	let disposable = vscode.commands.registerCommand('fetcher.fetch', () => { doFetch(); });

	let create = vscode.commands.registerCommand('fetcher.create', () => { createFetcher(); });

	context.subscriptions.push(disposable);
	context.subscriptions.push(create);
}

// This method is called when your extension is deactivated
export function deactivate() {}
