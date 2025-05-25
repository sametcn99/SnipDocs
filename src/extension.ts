// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// Define an interface for our documentation links
interface DocumentationLink {
	name: string;
	url: string;
	id: string; // Unique ID for the tree item
}

// Predefined list of popular documentation
const popularDocumentationLinks: DocumentationLink[] = [
	{ name: "VS Code Docs", url: "https://github.com/microsoft/vscode-docs", id: "vscode-docs" },
	{ name: "React Docs", url: "https://github.com/facebook/react", id: "react-docs" },
	{ name: "Angular Docs", url: "https://github.com/angular/angular", id: "angular-docs" },
	{ name: "Vue.js Docs", url: "https://github.com/vuejs/docs", id: "vuejs-docs" },
	{ name: "Python Docs", url: "https://github.com/python/cpython", id: "python-docs" },
	{ name: "Node.js Docs", url: "https://github.com/nodejs/docs", id: "nodejs-docs" },
	{ name: "TypeScript Handbook", url: "https://github.com/microsoft/TypeScript-Handbook", id: "typescript-handbook" },
];

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "snip-docs" is now active!');

	const documentationDataProvider = new DocumentationDataProvider(popularDocumentationLinks);
	vscode.window.registerTreeDataProvider("documentationView", documentationDataProvider);

	const openLinkCommand = vscode.commands.registerCommand("snip-docs.openLink", (url: string) => {
		vscode.env.openExternal(vscode.Uri.parse(url));
	});

	context.subscriptions.push(openLinkCommand);

	// Remove or comment out the old helloWorld command if no longer needed
	const disposable = vscode.commands.registerCommand("snip-docs.helloWorld", () => {
		vscode.window.showInformationMessage("Hello World from SnipDocs!");
	});
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

class DocumentationDataProvider implements vscode.TreeDataProvider<DocumentationTreeItem> {
	private _onDidChangeTreeData: vscode.EventEmitter<DocumentationTreeItem | undefined | null | void> = new vscode.EventEmitter<DocumentationTreeItem | undefined | null | void>();
	readonly onDidChangeTreeData: vscode.Event<DocumentationTreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

	constructor(private links: DocumentationLink[]) {}

	getTreeItem(element: DocumentationTreeItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: DocumentationTreeItem): Thenable<DocumentationTreeItem[]> {
		if (element) {
			// We don't have nested items for now
			return Promise.resolve([]);
		} else {
			return Promise.resolve(
				this.links.map(
					(link) => new DocumentationTreeItem(link, vscode.TreeItemCollapsibleState.None)
				)
			);
		}
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
}

class DocumentationTreeItem extends vscode.TreeItem {
	constructor(
		public readonly docLink: DocumentationLink,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(docLink.name, collapsibleState);
		this.tooltip = `${this.docLink.name} - ${this.docLink.url}`;
		this.description = this.docLink.url;
		this.id = this.docLink.id; // Assign the unique ID

		// Set the command to open the link
		this.command = {
			command: "snip-docs.openLink",
			title: "Open Link",
			arguments: [this.docLink.url],
		};
	}
}
