// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import fetch from "node-fetch"; // For making HTTP requests
import * as path from "path"; // For path operations
import * as crypto from "crypto"; // For generating cache keys

// Define an interface for our documentation links
interface DocumentationLink {
	name: string;
	id: string; // Unique ID for the tree item
	type: "repo" | "folder" | "file" | "heading" | "category"; // Added "category" type
	url?: string; // HTML URL on GitHub, optional for category
	pathInRepo?: string; // Path of the file/folder within its repository
	docPath?: string; // For 'repo' type: the sub-path containing docs (e.g., "docs", "" for root)
	rawUrl?: string; // URL to the raw markdown content (for files)
	apiContentsUrl?: string; // GitHub API URL to fetch contents (for repos/folders)
	level?: number; // Heading level
	category?: string; // To group documentation links
	children?: DocumentationLink[]; // For categories
}

// Predefined list of popular documentation repositories, now with categories
const popularDocumentationLinks: DocumentationLink[] = [
	{
		name: "Frontend Frameworks",
		id: "frontend-frameworks-category",
		type: "category",
		children: [
			{
				name: "React Docs",
				id: "react-docs-repo",
				type: "repo",
				url: "https://github.com/facebook/react",
				docPath: "docs",
				category: "Frontend Frameworks",
			},
			{
				name: "Angular Docs",
				id: "angular-docs-repo",
				type: "repo",
				url: "https://github.com/angular/angular",
				docPath: "aio/content",
				category: "Frontend Frameworks",
			},
			{ name: "Vue.js Docs", id: "vuejs-docs-repo", type: "repo", url: "https://github.com/vuejs/docs", docPath: "src", category: "Frontend Frameworks" },
			{ name: "Svelte Docs", id: "svelte-docs-repo", type: "repo", url: "https://github.com/sveltejs/svelte", docPath: "site/content/docs", category: "Frontend Frameworks" },
			{ name: "Ember.js Guides", id: "emberjs-guides-repo", type: "repo", url: "https://github.com/ember-learn/guides-source", docPath: "guides", category: "Frontend Frameworks" },
		]
	},
	{
		name: "JavaScript Ecosystem",
		id: "javascript-ecosystem-category",
		type: "category",
		children: [
			{
				name: "Node.js Docs",
				id: "nodejs-docs-repo",
				type: "repo",
				url: "https://github.com/nodejs/node",
				docPath: "doc/api",
				category: "JavaScript Ecosystem",
			},
			{
				name: "TypeScript Handbook",
				id: "typescript-handbook-repo",
				type: "repo",
				url: "https://github.com/microsoft/TypeScript-Handbook",
				docPath: "pages",
				category: "JavaScript Ecosystem",
			},
			{ name: "MDN Web Docs (JS)", id: "mdn-js-docs", type: "repo", url: "https://github.com/mdn/content", docPath: "files/en-us/web/javascript", category: "JavaScript Ecosystem" },
			{ name: "jQuery API Docs", id: "jquery-api-docs", type: "repo", url: "https://github.com/jquery/api.jquery.com", docPath: "entries", category: "JavaScript Ecosystem" },
			{ name: "Lodash Docs", id: "lodash-docs-repo", type: "repo", url: "https://github.com/lodash/lodash", docPath: "doc", category: "JavaScript Ecosystem" },

		]
	},
	{
		name: "Python Ecosystem",
		id: "python-ecosystem-category",
		type: "category",
		children: [
			{
				name: "Python Docs",
				id: "python-docs-repo",
				type: "repo",
				url: "https://github.com/python/cpython",
				docPath: "Doc",
				category: "Python Ecosystem",
			},
			{ name: "Django Docs", id: "django-docs-repo", type: "repo", url: "https://github.com/django/django", docPath: "docs", category: "Python Ecosystem" },
			{ name: "Flask Docs", id: "flask-docs-repo", type: "repo", url: "https://github.com/pallets/flask", docPath: "docs", category: "Python Ecosystem" },
			{ name: "NumPy Docs", id: "numpy-docs-repo", type: "repo", url: "https://github.com/numpy/numpy", docPath: "doc/source", category: "Python Ecosystem" },
			{ name: "Pandas Docs", id: "pandas-docs-repo", type: "repo", url: "https://github.com/pandas-dev/pandas", docPath: "doc/source", category: "Python Ecosystem" },
		]
	},
	{
		name: "VS Code Development",
		id: "vscode-dev-category",
		type: "category",
		children: [
			{
				name: "VS Code Docs",
				id: "vscode-docs-repo",
				type: "repo",
				url: "https://github.com/microsoft/vscode-docs",
				docPath: "",
				category: "VS Code Development",
			},
			// Example of linking to a specific file, though our current setup might treat it as a repo/folder to list
			{ name: "VS Code API (vscode.d.ts)", id: "vscode-api-dts", type: "file", url: "https://github.com/microsoft/vscode/blob/main/src/vs/vscode.d.ts", rawUrl: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vs/vscode.d.ts", category: "VS Code Development", pathInRepo: "src/vs/vscode.d.ts" },
		]
	},
	{
		name: "Cloud Platforms",
		id: "cloud-platforms-category",
		type: "category",
		children: [
			{ name: "AWS Documentation Examples", id: "aws-docs-examples-repo", type: "repo", url: "https://github.com/awsdocs/aws-doc-sdk-examples", docPath: "", category: "Cloud Platforms" },
			{ name: "Azure Documentation", id: "azure-docs-repo", type: "repo", url: "https://github.com/MicrosoftDocs/azure-docs", docPath: "articles", category: "Cloud Platforms" },
			{ name: "Google Cloud Community Tutorials", id: "gcp-community-repo", type: "repo", url: "https://github.com/GoogleCloudPlatform/community", docPath: "tutorials", category: "Cloud Platforms" },
		]
	},
	{
		name: "Databases",
		id: "databases-category",
		type: "category",
		children: [
			{ name: "PostgreSQL Docs", id: "postgres-docs-repo", type: "repo", url: "https://github.com/postgres/postgres", docPath: "doc/src/sgml", category: "Databases" },
			{ name: "MySQL Docs", id: "mysql-docs-repo", type: "repo", url: "https://github.com/mysql/mysql-server", docPath: "docs/refman/8.0/en", category: "Databases" },
			{ name: "MongoDB Docs", id: "mongodb-docs-repo", type: "repo", url: "https://github.com/mongodb/docs", docPath: "", category: "Databases" },
			{ name: "Redis Docs", id: "redis-docs-repo", type: "repo", url: "https://github.com/redis/redis-doc", docPath: "", category: "Databases" },
		]
	},
	{
		name: "DevOps & Tools",
		id: "devops-tools-category",
		type: "category",
		children: [
			{ name: "Docker Docs", id: "docker-docs-repo", type: "repo", url: "https://github.com/docker/docs", docPath: "content", category: "DevOps & Tools" },
			{ name: "Kubernetes Docs", id: "kubernetes-docs-repo", type: "repo", url: "https://github.com/kubernetes/website", docPath: "content/en/docs", category: "DevOps & Tools" },
			{ name: "Git Docs (Pro Git book)", id: "git-docs-progit", type: "repo", url: "https://github.com/progit/progit2", docPath: "book", category: "DevOps & Tools" },
			{ name: "Terraform Docs", id: "terraform-docs-repo", type: "repo", url: "https://github.com/hashicorp/terraform-website", docPath: "content/docs", category: "DevOps & Tools" },
			{ name: "Ansible Docs", id: "ansible-docs-repo", type: "repo", url: "https://github.com/ansible/ansible", docPath: "docs/docsite", category: "DevOps & Tools" },
		]
	},
	{
		name: "Mobile Development",
		id: "mobile-dev-category",
		type: "category",
		children: [
			{ name: "React Native Docs", id: "react-native-docs-repo", type: "repo", url: "https://github.com/facebook/react-native-website", docPath: "docs", category: "Mobile Development" },
			{ name: "Flutter Docs", id: "flutter-docs-repo", type: "repo", url: "https://github.com/flutter/website", docPath: "src/docs", category: "Mobile Development" },
			{ name: "Android Developer Samples", id: "android-dev-samples", type: "repo", url: "https://github.com/android/documentation-samples", docPath: "", category: "Mobile Development" },
			{ name: "Swift Book (Apple)", id: "swift-book-apple", type: "repo", url: "https://github.com/apple/swift-book", docPath: "content", category: "Mobile Development" },
			{ name: "Kotlin Docs", id: "kotlin-docs-repo", type: "repo", url: "https://github.com/JetBrains/kotlin-web-site", docPath: "docs/topics", category: "Mobile Development" },
		]
	},
	{
		name: "Programming Languages (General)",
		id: "prog-lang-general-category",
		type: "category",
		children: [
			{ name: "Java SE Documentation (OpenJDK)", id: "java-se-docs-openjdk", type: "repo", url: "https://github.com/openjdk/jdk", docPath: "doc/api", category: "Programming Languages (General)" }, // Note: This is complex, linking to API dir
			{ name: "C# Language Specification", id: "csharp-lang-spec", type: "repo", url: "https://github.com/dotnet/csharplang", docPath: "spec", category: "Programming Languages (General)" },
			{ name: "Go Documentation", id: "go-docs-repo", type: "repo", url: "https://github.com/golang/go", docPath: "doc", category: "Programming Languages (General)" },
			{ name: "Rust Programming Language Book", id: "rust-book-repo", type: "repo", url: "https://github.com/rust-lang/book", docPath: "src", category: "Programming Languages (General)" },
			{ name: "PHP Manual (Source)", id: "php-manual-src", type: "repo", url: "https://github.com/php/doc-en", docPath: "reference", category: "Programming Languages (General)" },
		]
	},
	{
		name: "Web Standards & APIs",
		id: "web-standards-category",
		type: "category",
		children: [
			{ name: "MDN Web Docs (General)", id: "mdn-web-docs-general", type: "repo", url: "https://github.com/mdn/content", docPath: "files/en-us/web", category: "Web Standards & APIs" },
			{ name: "W3C Specifications", id: "w3c-specs-repo", type: "repo", url: "https://github.com/w3c/spec-generator", docPath: "examples", category: "Web Standards & APIs" }, // Example, actual specs are diverse
			{ name: "WHATWG Standards", id: "whatwg-standards-repo", type: "repo", url: "https://github.com/whatwg/html", docPath: "source", category: "Web Standards & APIs" }, // HTML standard
		]
	}
];

// Helper function to generate a safe cache key from a URL
function getCacheKey(url: string): string {
	return crypto.createHash("md5").update(url).digest("hex") + ".md";
}

// Helper function to get the URI for a cache file
function getCacheFileUri(storageUri: vscode.Uri, rawUrl: string): vscode.Uri {
	const cacheKey = getCacheKey(rawUrl);
	return vscode.Uri.joinPath(storageUri, cacheKey);
}

async function readFromCache(storageUri: vscode.Uri, rawUrl: string): Promise<string | null> {
	const cacheFileUri = getCacheFileUri(storageUri, rawUrl);
	try {
		const contentBytes = await vscode.workspace.fs.readFile(cacheFileUri);
		return new TextDecoder().decode(contentBytes);
	} catch (error) {
		if (error instanceof vscode.FileSystemError && error.code === "FileNotFound") {
			return null; // Cache miss
		}
		console.error(`Error reading from cache ${cacheFileUri.fsPath}:`, error);
		return null; // Other error
	}
}

async function writeToCache(storageUri: vscode.Uri, rawUrl: string, content: string): Promise<void> {
	const cacheFileUri = getCacheFileUri(storageUri, rawUrl);
	try {
		await vscode.workspace.fs.writeFile(cacheFileUri, new TextEncoder().encode(content));
		console.log(`Cached content for ${rawUrl} to ${cacheFileUri.fsPath}`);
	} catch (error) {
		console.error(`Error writing to cache ${cacheFileUri.fsPath}:`, error);
		vscode.window.showErrorMessage(`Failed to cache file: ${error instanceof Error ? error.message : String(error)}`);
	}
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "snip-docs" is now active!');

	// Ensure the global storage path exists
	try {
		await vscode.workspace.fs.createDirectory(context.globalStorageUri);
		console.log(`Global storage directory ensured: ${context.globalStorageUri.fsPath}`);
	} catch (error) {
		console.error("Failed to create global storage directory:", error);
		// Continue without caching if directory creation fails, or handle more gracefully
	}

	const documentationDataProvider = new DocumentationDataProvider(context.globalState);
	vscode.window.registerTreeDataProvider("documentationView", documentationDataProvider);

	// Command to open links externally (GitHub HTML page)
	const openLinkCommand = vscode.commands.registerCommand("snip-docs.openLink", (url: string) => {
		vscode.env.openExternal(vscode.Uri.parse(url));
	});
	context.subscriptions.push(openLinkCommand);

	// Command to open Markdown files internally in a new VS Code editor
	const openInternalFileCommand = vscode.commands.registerCommand("snip-docs.openInternalFile", async (rawUrl: string, fileName: string) => {
		if (!rawUrl) {
			vscode.window.showErrorMessage("No raw URL available to fetch file content.");
			return;
		}
		try {
			await vscode.window.withProgress({
				location: vscode.ProgressLocation.Notification,
				title: `Opening ${fileName}...`,
				cancellable: false
			}, async (progress) => {
				progress.report({ message: "Checking cache..." });
				let content = await readFromCache(context.globalStorageUri, rawUrl);
				let source = "cache";

				if (content === null) {
					progress.report({ message: `Fetching from network...` });
					source = "network";
					content = await fetchMarkdownContent(rawUrl);
					if (content !== null) {
						await writeToCache(context.globalStorageUri, rawUrl, content);
					} else {
						// Error message already shown by fetchMarkdownContent
						return;
					}
				}

				progress.report({ message: "Opening document..." });
				const document = await vscode.workspace.openTextDocument({ content, language: "markdown" });
				await vscode.window.showTextDocument(document, { preview: false });
				vscode.window.showInformationMessage(`Opened ${fileName} from ${source}.`);
			});
		} catch (error) {
			console.error("Error opening file internally:", error);
			vscode.window.showErrorMessage(`Could not open file ${fileName} internally: ${error instanceof Error ? error.message : String(error)}`);
		}
	});
	context.subscriptions.push(openInternalFileCommand);

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

async function fetchMarkdownContent(url: string): Promise<string | null> { // Returns null on error
	try {
		console.log(`Fetching Markdown content from: ${url}`);
		const response = await fetch(url);
		if (!response.ok) {
			const errorText = await response.text();
			console.error(`Failed to fetch ${url}: ${response.statusText} (${response.status}). Body: ${errorText}`);
			vscode.window.showErrorMessage(`Failed to fetch content from ${url}: ${response.statusText} (${response.status})`);
			return null;
		}
		return await response.text();
	} catch (error) {
		console.error("Error fetching markdown content:", error);
		vscode.window.showErrorMessage(`Error fetching content: ${error instanceof Error ? error.message : String(error)}`);
		return null;
	}
}

async function fetchGitHubContents(apiUrl: string): Promise<GitHubContent[]> {
	try {
		console.log(`Fetching GitHub contents from: ${apiUrl}`);
		const response = await fetch(apiUrl, { headers: { "Accept": "application/vnd.github.v3+json" } });
		if (!response.ok) {
			throw new Error(`Failed to fetch ${apiUrl}: ${response.statusText} (${response.status})`);
		}
		const data = await response.json();
		return Array.isArray(data) ? data as GitHubContent[] : [];
	} catch (error) {
		console.error("Error fetching GitHub contents:", error);
		vscode.window.showErrorMessage(`Error fetching GitHub contents: ${error instanceof Error ? error.message : String(error)}`);
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
			// Root level: display the categories or top-level repos
			return popularDocumentationLinks.map(
				(link) => new DocumentationTreeItem(link, link.type === "category" ? vscode.TreeItemCollapsibleState.Collapsed : (link.type === "repo" ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None))
			);
		}

		const parentLink = element.docLink;
		let childrenLinks: DocumentationLink[] = [];

		if (parentLink.type === "category" && parentLink.children) {
			childrenLinks = parentLink.children;
		} else if (parentLink.type === "repo" || parentLink.type === "folder") {
			let apiContentsUrl = parentLink.apiContentsUrl;
			if (parentLink.type === "repo" && !apiContentsUrl) {
				// Ensure URL exists for repo type before parsing
				if (!parentLink.url) {
					vscode.window.showErrorMessage(`Missing URL for repository: ${parentLink.name}`);
					return [];
				}
				const repoInfo = parseGitHubRepoUrl(parentLink.url);
				if (repoInfo) {
					apiContentsUrl = `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/contents/${parentLink.docPath || ""}`;
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
						id: `${parentLink.id}-${item.name}`.replace(/\\s+/g, "-").replace(/[^a-zA-Z0-9-_]/g, ''), // Sanitize ID
						type: item.type === "dir" ? "folder" : "file",
						url: item.html_url,
						pathInRepo: item.path,
						rawUrl: item.type === "file" ? item.download_url || undefined : undefined,
						apiContentsUrl: item.type === "dir" ? item.url : undefined, // API URL for this specific item if it's a directory
						category: parentLink.category, // Propagate category from parent
					})
				);
			}
		}
		// TODO: Add heading parsing for \'file\' type if desired, similar to previous implementation

		return childrenLinks.map(
			(link) =>
				new DocumentationTreeItem(
					link,
					// Collapse repos, folders, and categories; files are not collapsible
					(link.type === "repo" || link.type === "folder" || link.type === "category") ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None
				)
		);
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
}

class DocumentationTreeItem extends vscode.TreeItem {
	constructor(
		public readonly docLink: DocumentationLink,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState
		// command is now set dynamically below, so removed from constructor params
	) {
		super(docLink.name, collapsibleState);
		this.id = docLink.id;
		this.tooltip = `${this.docLink.name} (${this.docLink.type}) - ${this.docLink.url}`;
		this.description = this.docLink.pathInRepo;

		// Dynamically set the command based on the item type
		if (docLink.type === "file" && docLink.name.endsWith(".md") && docLink.rawUrl) {
			this.command = {
				command: "snip-docs.openInternalFile",
				title: "Open in Editor",
				arguments: [docLink.rawUrl, docLink.name],
			};
		} else {
			this.command = {
				command: "snip-docs.openLink",
				title: "Open on GitHub",
				arguments: [docLink.url],
			};
		}

		switch (docLink.type) {
			case "repo":
				this.iconPath = new vscode.ThemeIcon("repo");
				break;
			case "folder":
				this.iconPath = vscode.ThemeIcon.Folder;
				break;
			case "category": // Added icon for category
				this.iconPath = new vscode.ThemeIcon("symbol-namespace"); // Using namespace icon for categories
				break;
			case "file":
				this.iconPath = vscode.ThemeIcon.File;
				if (docLink.name.endsWith(".md")) {
					this.iconPath = new vscode.ThemeIcon("markdown");
				}
				break;
			case "heading":
				// this.iconPath = new vscode.ThemeIcon("symbol-namespace");
				break;
		}
	}
}
