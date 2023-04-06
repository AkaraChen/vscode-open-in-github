import * as vscode from 'vscode';

enum Action {
	openRepoHomepage = 'Open repo homepage',
	openCurrentFile = 'Open current file',
}

async function modal() {
	const selection = await vscode.window.showQuickPick([
		Action.openRepoHomepage,
		Action.openCurrentFile
	], { placeHolder: 'Open in GitHub' }) as Action | undefined;

	if (!selection) { return; };

	switch (selection) {
		case Action.openCurrentFile: {
			vscode.commands.executeCommand('openInGitHub.openFile');
			break;
		}
		case Action.openRepoHomepage: {
			vscode.commands.executeCommand('openInGitHub.openProject');
			break;
		}
	}
}

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('open-in-github.modal', modal);

	context.subscriptions.push(
		disposable
	);

	const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	console.log(statusBar);
	statusBar.command = 'open-in-github.modal';
	statusBar.text = '$(github)';
	statusBar.tooltip = 'Open in GitHub';
	statusBar.show();
}

export function deactivate() { }
