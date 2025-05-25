// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import fetch from "node-fetch"; // For making HTTP requests

// Define an interface for our documentation links
interface DocumentationLink {
	name: string;
	id: string; // Unique ID for the tree item
	type: "repo" | "folder" | "file" | "heading";
	url: string; // HTML URL on GitHub
	pathInRepo?: string; // Path of the file/folder within its repository
	docPath?: string; // For 'repo' type: the sub-path containing docs (e.g., "docs", "" for root)
	rawUrl?: string; // URL to the raw markdown content (for files)
	apiContentsUrl?: string; // GitHub API URL to fetch contents (for repos/folders)
	level?: number; // Heading level
}

// Predefined list of popular documentation repositories
const popularDocumentationLinks: DocumentationLink[] = [
	{
		name: "VS Code Docs",
		id: "vscode-docs-repo",
		type: "repo",
		url: "https://github.com/microsoft/vscode-docs",
		docPath: "",
	}, // Assuming docs are at the root or we want to list root contents
	{
		name: "React Docs",
		id: "react-docs-repo",
		type: "repo",
		url: "https://github.com/facebook/react",
		docPath: "docs",
	},
	{
		name: "Angular Docs",
		id: "angular-docs-repo",
		type: "repo",
		url: "https://github.com/angular/angular",
		docPath: "aio/content",
	}, // Example, actual path might differ
	{ name: "Vue.js Docs", id: "vuejs-docs-repo", type: "repo", url: "https://github.com/vuejs/docs", docPath: "src" },
	{
		name: "Python Docs",
		id: "python-docs-repo",
		type: "repo",
		url: "https://github.com/python/cpython",
		docPath: "Doc",
	},
	{
		name: "Node.js Docs",
		id: "nodejs-docs-repo",
		type: "repo",
		url: "https://github.com/nodejs/node",
		docPath: "doc/api",
	}, // Points to API docs within the main node repo
	{
		name: "TypeScript Handbook",
		id: "typescript-handbook-repo",
		type: "repo",
		url: "https://github.com/microsoft/TypeScript-Handbook",
		docPath: "pages",
	},
];

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "snip-docs" is now active!');

	const documentationDataProvider = new DocumentationDataProvider(context.globalState);
	vscode.window.registerTreeDataProvider("documentationView", documentationDataProvider);

	const openLinkCommand = vscode.commands.registerCommand("snip-docs.openLink", (url: string) => {
		vscode.env.openExternal(vscode.Uri.parse(url));
	});
	context.subscriptions.push(openLinkCommand);

	const refreshCommand = vscode.commands.registerCommand("snip-docs.refreshDocumentation", () => {
		documentationDataProvider.refresh();
	});
	context.subscriptions.push(refreshCommand);

	const disposable = vscode.commands.registerCommand("snip-docs.helloWorld", () => {
		vscode.window.showInformationMessage("Hello World from SnipDocs!");
	});
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

interface GitHubContent {
	name: string;
	path: string;
	type: "file" | "dir";
	html_url: string;
	download_url: string | null;
	url: string; // API URL for this content item
}

async function fetchGitHubContents(apiUrl: string): Promise<GitHubContent[]> {
	try {
		console.log(`Fetching GitHub contents from: ${apiUrl}`);
		const response = await fetch(apiUrl, { headers: { Accept: "application/vnd.github.v3+json" } });
		if (!response.ok) {
			throw new Error(`Failed to fetch ${apiUrl}: ${response.statusText} (${response.status})`);
		}
		const data = await response.json();
		return Array.isArray(data) ? (data as GitHubContent[]) : [];
	} catch (error) {
		console.error("Error fetching GitHub contents:", error);
		vscode.window.showErrorMessage(
			`Error fetching GitHub contents: ${error instanceof Error ? error.message : String(error)}`
		);
		return [];
	}
}

// Basic function to extract owner/repo from https://github.com/OWNER/REPO URL
function parseGitHubRepoUrl(repoUrl: string): { owner: string; repo: string } | null {
	const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
	if (match && match[1] && match[2]) {
		return { owner: match[1], repo: match[2] };
	}
	return null;
}

class DocumentationDataProvider implements vscode.TreeDataProvider<DocumentationTreeItem> {
	private _onDidChangeTreeData: vscode.EventEmitter<DocumentationTreeItem | undefined | null | void> =
		new vscode.EventEmitter<DocumentationTreeItem | undefined | null | void>();
	readonly onDidChangeTreeData: vscode.Event<DocumentationTreeItem | undefined | null | void> =
		this._onDidChangeTreeData.event;

	constructor(private globalState: vscode.Memento) {}

	getTreeItem(element: DocumentationTreeItem): vscode.TreeItem {
		return element;
	}

	async getChildren(element?: DocumentationTreeItem): Promise<DocumentationTreeItem[]> {
		if (!element) {
			// Root level: display the popular documentation repositories
			return popularDocumentationLinks.map(
				(link) => new DocumentationTreeItem(link, vscode.TreeItemCollapsibleState.Collapsed)
			);
		}

		const parentLink = element.docLink;
		let childrenLinks: DocumentationLink[] = [];

		if (parentLink.type === "repo" || parentLink.type === "folder") {
			let apiContentsUrl = parentLink.apiContentsUrl;
			if (parentLink.type === "repo" && !apiContentsUrl) {
				const repoInfo = parseGitHubRepoUrl(parentLink.url);
				if (repoInfo) {
					apiContentsUrl = `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/contents/${
						parentLink.docPath || ""
					}`;
				} else {
					vscode.window.showErrorMessage(`Invalid GitHub repo URL: ${parentLink.url}`);
					return [];
				}
			}

			if (apiContentsUrl) {
				const contents = await fetchGitHubContents(apiContentsUrl);
				childrenLinks = contents.map(
					(item): DocumentationLink => ({
						name: item.name,
						id: `${parentLink.id}-${item.name}`.replace(/\s+/g, "-"),
						type: item.type === "dir" ? "folder" : "file",
						url: item.html_url,
						pathInRepo: item.path,
						rawUrl: item.type === "file" ? item.download_url || undefined : undefined,
						apiContentsUrl: item.type === "dir" ? item.url : undefined, // API URL for this specific item if it's a directory
					})
				);
			}
		}
		// TODO: Add heading parsing for 'file' type if desired, similar to previous implementation

		return childrenLinks.map(
			(link) =>
				new DocumentationTreeItem(
					link,
					link.type === "folder" ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None
				)
		);
	}

	refresh(): void {
		// Potentially clear cache here if implementing caching
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
		this.id = docLink.id;
		this.tooltip = `${this.docLink.name} (${this.docLink.type}) - ${this.docLink.url}`;
		this.description = this.docLink.pathInRepo;

		this.command = {
			command: "snip-docs.openLink",
			title: "Open on GitHub",
			arguments: [this.docLink.url],
		};

		switch (docLink.type) {
			case "repo":
				this.iconPath = new vscode.ThemeIcon("repo");
				break;
			case "folder":
				this.iconPath = vscode.ThemeIcon.Folder;
				break;
			case "file":
				this.iconPath = vscode.ThemeIcon.File;
				// Could check for markdown extension and use a different icon
				if (docLink.name.endsWith(".md")) {
					this.iconPath = new vscode.ThemeIcon("markdown");
				}
				break;
			case "heading":
				// this.iconPath = new vscode.ThemeIcon("symbol-namespace"); // Or similar
				break;
		}
	}
}
