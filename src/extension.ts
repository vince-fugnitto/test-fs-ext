
import * as vscode from 'vscode';
import * as path from 'path';
import { TextEncoder, TextDecoder } from 'util';

export function activate(context: vscode.ExtensionContext) {

	const disposables: vscode.Disposable[] = [];

	/**
	 * Create a new test file.
	 */
	disposables.push(
		vscode.commands.registerCommand('fs.createNewFile', () => {
			const rootUri: vscode.Uri = vscode.workspace.workspaceFolders![0].uri;
			const filePath = path.join(...[rootUri.path, 'vince.ts']);
			const fileUri = vscode.Uri.file(filePath);
			const encodedContent = new TextEncoder().encode('console.log("a")');
			vscode.workspace.fs.writeFile(fileUri, encodedContent);
		})
	);

	/**
	 * Read the contents of the active editor.
	 */
	disposables.push(
		vscode.commands.registerCommand('fs.readActiveFile', async () => {
			const activeEditor = vscode.window.activeTextEditor;
			if (activeEditor) {
				const content = await vscode.workspace.fs.readFile(activeEditor.document.uri);
				const decodedContent = new TextDecoder().decode(content);
				vscode.window.showInformationMessage(`${decodedContent.substring(0, 20)}...`);
			}
		})
	);

	context.subscriptions.push(...disposables);
}

// this method is called when your extension is deactivated
export function deactivate() { }
