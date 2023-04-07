import { ExtensionContext, QuickPickItem, StatusBarAlignment, commands, window } from 'vscode';

const ACTION: Record<string, QuickPickItem> =  {
	openRepoHomepage: {
		label: 'Homepage',
		description: 'Open the repository homepage in your browser',
	},
	openCurrentFile: {
		label: 'Current file',
		description: 'Open the current file in your browser',
	},
};

async function modal() {
	const selection = await window.showQuickPick(Object.values(ACTION));
	if (!selection) { return; };
	switch (selection) {
		case ACTION.openCurrentFile: {
			commands.executeCommand('openInGitHub.openFile');
			break;
		}
		case ACTION.openRepoHomepage: {
			commands.executeCommand('openInGitHub.openProject');
			break;
		}
	}
}

export function activate(context: ExtensionContext) {
	context.subscriptions.push(
		commands.registerCommand('open-in-github.modal', modal)
	);
	const barItem = window.createStatusBarItem(StatusBarAlignment.Left, 0);
	barItem.command = 'open-in-github.modal';
	barItem.text = '$(github)';
	barItem.tooltip = 'Open in GitHub';
	barItem.show();
}
