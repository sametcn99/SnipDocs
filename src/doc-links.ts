export interface DocumentationLink {
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
export const popularDocumentationLinks: DocumentationLink[] = [
	{
		name: "Frontend Frameworks",
		id: "frontend-frameworks-category",
		type: "category",
		children: [
			{
				name: "Angular Docs",
				id: "angular-docs-repo",
				type: "repo",
				url: "https://github.com/angular/angular",
				docPath: "adev/src/content",
				category: "Frontend Frameworks",
			},
			{
				name: "Vue.js Docs",
				id: "vuejs-docs-repo",
				type: "repo",
				url: "https://github.com/vuejs/docs",
				docPath: "src",
				category: "Frontend Frameworks",
			},
			{
				name: "Svelte Docs",
				id: "svelte-docs-repo",
				type: "repo",
				url: "https://github.com/sveltejs/svelte",
				docPath: "documentation/docs",
				category: "Frontend Frameworks",
			},
			{
				name: "Ember.js Guides",
				id: "emberjs-guides-repo",
				type: "repo",
				url: "https://github.com/ember-learn/guides-source",
				docPath: "guides",
				category: "Frontend Frameworks",
			},
			{
				name: "React Docs",
				id: "react-docs-repo",
				type: "repo",
				url: "https://github.com/facebook/react",
				docPath: "docs", // Assuming 'docs' as a common path, verify if different
				category: "Frontend Frameworks",
			},
			{
				name: "Bootstrap Docs",
				id: "bootstrap-docs-repo",
				type: "repo",
				url: "https://github.com/twbs/bootstrap",
				docPath: "docs", // Assuming 'docs' as a common path, verify if different
				category: "Frontend Frameworks",
			},
			{
				name: "Next.js Docs",
				id: "nextjs-docs-repo",
				type: "repo",
				url: "https://github.com/vercel/next.js",
				docPath: "docs",
				category: "Frontend Frameworks",
			},
			{
				name: "Nuxt.js Docs",
				id: "nuxtjs-docs-repo",
				type: "repo",
				url: "https://github.com/nuxt/nuxt.js",
				docPath: "docs/guide",
				category: "Frontend Frameworks",
			},
			{
				name: "Gatsby Docs",
				id: "gatsby-docs-repo",
				type: "repo",
				url: "https://github.com/gatsbyjs/gatsby",
				docPath: "docs",
				category: "Frontend Frameworks",
			},
			{
				name: "SolidJS Docs",
				id: "solidjs-docs-repo",
				type: "repo",
				url: "https://github.com/solidjs/solid-docs",
				docPath: "langs/en/docs",
				category: "Frontend Frameworks",
			},
			{
				name: "Qwik Docs",
				id: "qwik-docs-repo",
				type: "repo",
				url: "https://github.com/BuilderIO/qwik",
				docPath: "starters/docs/docs",
				category: "Frontend Frameworks",
			},
			{
				name: "Alpine.js Docs",
				id: "alpinejs-docs-repo",
				type: "repo",
				url: "https://github.com/alpinejs/alpine",
				docPath: "packages/docs/src",
				category: "Frontend Frameworks",
			},
			{
				name: "Lit Docs",
				id: "lit-docs-repo",
				type: "repo",
				url: "https://github.com/lit/lit.dev",
				docPath: "site/content/docs",
				category: "Frontend Frameworks",
			},
		],
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
				docPath: "doc",
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
			{
				name: "MDN Web Docs (JS)",
				id: "mdn-js-docs",
				type: "repo",
				url: "https://github.com/mdn/content",
				docPath: "files/en-us/web/javascript",
				category: "JavaScript Ecosystem",
			},
			{
				name: "jQuery API Docs",
				id: "jquery-api-docs",
				type: "repo",
				url: "https://github.com/jquery/api.jquery.com",
				docPath: "entries",
				category: "JavaScript Ecosystem",
			},
			{
				name: "Lodash Docs",
				id: "lodash-docs-repo",
				type: "repo",
				url: "https://github.com/lodash/lodash",
				docPath: "doc",
				category: "JavaScript Ecosystem",
			},
			{
				name: "Webpack Docs",
				id: "webpack-docs-repo",
				type: "repo",
				url: "https://github.com/webpack/webpack.js.org",
				docPath: "src/content",
				category: "JavaScript Ecosystem",
			},
			{
				name: "Babel Docs",
				id: "babel-docs-repo",
				type: "repo",
				url: "https://github.com/babel/website",
				docPath: "docs",
				category: "JavaScript Ecosystem",
			},
			{
				name: "ESLint Docs",
				id: "eslint-docs-repo",
				type: "repo",
				url: "https://github.com/eslint/eslint",
				docPath: "docs",
				category: "JavaScript Ecosystem",
			},
			{
				name: "Prettier Docs",
				id: "prettier-docs-repo",
				type: "repo",
				url: "https://github.com/prettier/prettier-docs",
				docPath: "docs",
				category: "JavaScript Ecosystem",
			},
			{
				name: "Jest Docs",
				id: "jest-docs-repo",
				type: "repo",
				url: "https://github.com/facebook/jest",
				docPath: "docs",
				category: "JavaScript Ecosystem",
			},
			{
				name: "Mocha Docs",
				id: "mocha-docs-repo",
				type: "repo",
				url: "https://github.com/mochajs/mocha",
				docPath: "docs",
				category: "JavaScript Ecosystem",
			},
			{
				name: "Redux Docs",
				id: "redux-docs-repo",
				type: "repo",
				url: "https://github.com/reduxjs/redux",
				docPath: "docs",
				category: "JavaScript Ecosystem",
			},
			{
				name: "RxJS Docs",
				id: "rxjs-docs-repo",
				type: "repo",
				url: "https://github.com/ReactiveX/rxjs",
				docPath: "docs_app/content/guide",
				category: "JavaScript Ecosystem",
			},
			{
				name: "D3.js API Reference",
				id: "d3js-api-repo",
				type: "repo",
				url: "https://github.com/d3/d3",
				docPath: "API.md", // This is a single large file, might need special handling
				category: "JavaScript Ecosystem",
			},
			{
				name: "Three.js Docs",
				id: "threejs-docs-repo",
				type: "repo",
				url: "https://github.com/mrdoob/three.js",
				docPath: "docs",
				category: "JavaScript Ecosystem",
			},
			{
				name: "Socket.IO Docs",
				id: "socketio-docs-repo",
				type: "repo",
				url: "https://github.com/socketio/socket.io-website",
				docPath: "src/pages/docs",
				category: "JavaScript Ecosystem",
			},
			{
				name: "Moment.js Docs (Legacy)",
				id: "momentjs-docs-repo",
				type: "repo",
				url: "https://github.com/moment/momentjs.com",
				docPath: "docs",
				category: "JavaScript Ecosystem",
			},
			{
				name: "Date-fns Docs",
				id: "date-fns-docs-repo",
				type: "repo",
				url: "https://github.com/date-fns/date-fns",
				docPath: "docs",
				category: "JavaScript Ecosystem",
			},
		],
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
			{
				name: "Django Docs",
				id: "django-docs-repo",
				type: "repo",
				url: "https://github.com/django/django",
				docPath: "docs",
				category: "Python Ecosystem",
			},
			{
				name: "Flask Docs",
				id: "flask-docs-repo",
				type: "repo",
				url: "https://github.com/pallets/flask",
				docPath: "docs",
				category: "Python Ecosystem",
			},
			{
				name: "NumPy Docs",
				id: "numpy-docs-repo",
				type: "repo",
				url: "https://github.com/numpy/numpy",
				docPath: "doc/source",
				category: "Python Ecosystem",
			},
			{
				name: "Pandas Docs",
				id: "pandas-docs-repo",
				type: "repo",
				url: "https://github.com/pandas-dev/pandas",
				docPath: "doc/source",
				category: "Python Ecosystem",
			},
			{
				name: "Requests Docs",
				id: "requests-docs-repo",
				type: "repo",
				url: "https://github.com/psf/requests",
				docPath: "docs",
				category: "Python Ecosystem",
			},
			{
				name: "Scikit-learn Docs",
				id: "scikit-learn-docs-repo",
				type: "repo",
				url: "https://github.com/scikit-learn/scikit-learn",
				docPath: "doc",
				category: "Python Ecosystem",
			},
			{
				name: "SQLAlchemy Docs",
				id: "sqlalchemy-docs-repo",
				type: "repo",
				url: "https://github.com/sqlalchemy/sqlalchemy",
				docPath: "doc/build/orm", // More specific path might be needed
				category: "Python Ecosystem",
			},
			{
				name: "Matplotlib Docs",
				id: "matplotlib-docs-repo",
				type: "repo",
				url: "https://github.com/matplotlib/matplotlib",
				docPath: "doc",
				category: "Python Ecosystem",
			},
			{
				name: "Beautiful Soup Docs",
				id: "beautifulsoup-docs-repo",
				type: "repo",
				url: "https://git.launchpad.net/beautifulsoup/tree/", // This is not GitHub, adjust if direct GitHub mirror is preferred
				docPath: "doc",
				category: "Python Ecosystem",
			},
			{
				name: "FastAPI Docs",
				id: "fastapi-docs-repo",
				type: "repo",
				url: "https://github.com/tiangolo/fastapi",
				docPath: "docs/en/docs",
				category: "Python Ecosystem",
			},
			{
				name: "Celery Docs",
				id: "celery-docs-repo",
				type: "repo",
				url: "https://github.com/celery/celery",
				docPath: "docs",
				category: "Python Ecosystem",
			},
			{
				name: "Pillow (PIL Fork) Docs",
				id: "pillow-docs-repo",
				type: "repo",
				url: "https://github.com/python-pillow/Pillow",
				docPath: "docs",
				category: "Python Ecosystem",
			},
			{
				name: "Pytest Docs",
				id: "pytest-docs-repo",
				type: "repo",
				url: "https://github.com/pytest-dev/pytest",
				docPath: "doc/en",
				category: "Python Ecosystem",
			},
		],
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
			{
				name: "VS Code API (vscode.d.ts)",
				id: "vscode-api-dts",
				type: "file",
				url: "https://github.com/microsoft/vscode/blob/main/src/vs/vscode.d.ts",
				rawUrl: "https://raw.githubusercontent.com/microsoft/vscode/main/src/vs/vscode.d.ts",
				category: "VS Code Development",
				pathInRepo: "src/vs/vscode.d.ts",
			},
		],
	},
	{
		name: "Cloud Platforms",
		id: "cloud-platforms-category",
		type: "category",
		children: [
			{
				name: "AWS Documentation Examples",
				id: "aws-docs-examples-repo",
				type: "repo",
				url: "https://github.com/awsdocs/aws-doc-sdk-examples",
				docPath: "",
				category: "Cloud Platforms",
			},
			{
				name: "Azure Documentation",
				id: "azure-docs-repo",
				type: "repo",
				url: "https://github.com/MicrosoftDocs/azure-docs",
				docPath: "articles",
				category: "Cloud Platforms",
			},
			{
				name: "Google Cloud Community Tutorials",
				id: "gcp-community-repo",
				type: "repo",
				url: "https://github.com/GoogleCloudPlatform/community",
				docPath: "tutorials",
				category: "Cloud Platforms",
			},
			{
				name: "DigitalOcean Docs",
				id: "digitalocean-docs-repo",
				type: "repo",
				url: "https://github.com/digitalocean/docs",
				docPath: "content/docs",
				category: "Cloud Platforms",
			},
			{
				name: "Heroku Dev Center",
				id: "heroku-devcenter-repo",
				type: "repo",
				url: "https://github.com/heroku/devcenter",
				docPath: "articles",
				category: "Cloud Platforms",
			},
			{
				name: "Linode Docs",
				id: "linode-docs-repo",
				type: "repo",
				url: "https://github.com/linode/docs",
				docPath: "docs",
				category: "Cloud Platforms",
			},
			{
				name: "Vultr Docs",
				id: "vultr-docs-repo",
				type: "repo",
				url: "https://github.com/vultr/docs",
				docPath: "docs",
				category: "Cloud Platforms",
			},
			{
				name: "Firebase Docs",
				id: "firebase-docs-repo",
				type: "repo",
				url: "https://github.com/firebase/firebase-tools", // Tools repo, docs are integrated
				docPath: "docs", // This might not be the primary doc source, link to website if better
				category: "Cloud Platforms",
			},
			{
				name: "Netlify Docs",
				id: "netlify-docs-repo",
				type: "repo",
				url: "https://github.com/netlify/docs",
				docPath: "src",
				category: "Cloud Platforms",
			},
		],
	},
	{
		name: "Databases",
		id: "databases-category",
		type: "category",
		children: [
			{
				name: "PostgreSQL Docs",
				id: "postgres-docs-repo",
				type: "repo",
				url: "https://github.com/postgres/postgres",
				docPath: "doc/src/sgml",
				category: "Databases",
			},
			{
				name: "MySQL Docs",
				id: "mysql-docs-repo",
				type: "repo",
				url: "https://github.com/mysql/mysql-server",
				docPath: "docs/refman/8.0/en",
				category: "Databases",
			},
			{
				name: "MongoDB Docs",
				id: "mongodb-docs-repo",
				type: "repo",
				url: "https://github.com/mongodb/docs",
				docPath: "",
				category: "Databases",
			},
			{
				name: "Redis Docs",
				id: "redis-docs-repo",
				type: "repo",
				url: "https://github.com/redis/redis-doc",
				docPath: "",
				category: "Databases",
			},
			{
				name: "SQLite Docs",
				id: "sqlite-docs-repo",
				type: "repo",
				url: "https://github.com/sqlite/sqlite",
				docPath: "doc",
				category: "Databases",
			},
			{
				name: "Elasticsearch Guide",
				id: "elasticsearch-guide-repo",
				type: "repo",
				url: "https://github.com/elastic/elasticsearch",
				docPath: "docs",
				category: "Databases",
			},
			{
				name: "MariaDB Server Docs",
				id: "mariadb-docs-repo",
				type: "repo",
				url: "https://github.com/MariaDB/server",
				docPath: "docs/reference/sql-statements", // Example path, actual docs are structured differently
				category: "Databases",
			},
			{
				name: "Neo4j Docs",
				id: "neo4j-docs-repo",
				type: "repo",
				url: "https://github.com/neo4j/neo4j-documentation",
				docPath: "asciidoc/docs/operations-manual", // Example path
				category: "Databases",
			},
			{
				name: "CouchDB Docs",
				id: "couchdb-docs-repo",
				type: "repo",
				url: "https://github.com/apache/couchdb-documentation",
				docPath: "src",
				category: "Databases",
			},
			{
				name: "ArangoDB Docs",
				id: "arangodb-docs-repo",
				type: "repo",
				url: "https://github.com/arangodb/docs",
				docPath: "3.10/site/content/docs", // Version specific path
				category: "Databases",
			},
		],
	},
	{
		name: "DevOps & Tools",
		id: "devops-tools-category",
		type: "category",
		children: [
			{
				name: "Docker Docs",
				id: "docker-docs-repo",
				type: "repo",
				url: "https://github.com/docker/docs",
				docPath: "content",
				category: "DevOps & Tools",
			},
			{
				name: "Kubernetes Docs",
				id: "kubernetes-docs-repo",
				type: "repo",
				url: "https://github.com/kubernetes/website",
				docPath: "content/en/docs",
				category: "DevOps & Tools",
			},
			{
				name: "Git Docs (Pro Git book)",
				id: "git-docs-progit",
				type: "repo",
				url: "https://github.com/progit/progit2",
				docPath: "book",
				category: "DevOps & Tools",
			},
			{
				name: "Terraform Docs",
				id: "terraform-docs-repo",
				type: "repo",
				url: "https://github.com/hashicorp/terraform-website",
				docPath: "content/docs",
				category: "DevOps & Tools",
			},
			{
				name: "Ansible Docs",
				id: "ansible-docs-repo",
				type: "repo",
				url: "https://github.com/ansible/ansible",
				docPath: "docs/docsite",
				category: "DevOps & Tools",
			},
			{
				name: "Jenkins Docs",
				id: "jenkins-docs-repo",
				type: "repo",
				url: "https://github.com/jenkins-infra/jenkins.io",
				docPath: "content/doc",
				category: "DevOps & Tools",
			},
			{
				name: "Gradle Docs",
				id: "gradle-docs-repo",
				type: "repo",
				url: "https://github.com/gradle/gradle",
				docPath: "subprojects/docs/src/docs/userguide",
				category: "DevOps & Tools",
			},
			{
				name: "Vagrant Docs",
				id: "vagrant-docs-repo",
				type: "repo",
				url: "https://github.com/hashicorp/vagrant",
				docPath: "website/content/docs",
				category: "DevOps & Tools",
			},
			{
				name: "Chef Docs",
				id: "chef-docs-repo",
				type: "repo",
				url: "https://github.com/chef/chef-web-docs",
				docPath: "content/docs",
				category: "DevOps & Tools",
			},
			{
				name: "Puppet Docs",
				id: "puppet-docs-repo",
				type: "repo",
				url: "https://github.com/puppetlabs/puppet-docs",
				docPath: "source",
				category: "DevOps & Tools",
			},
			{
				name: "Prometheus Docs",
				id: "prometheus-docs-repo",
				type: "repo",
				url: "https://github.com/prometheus/docs",
				docPath: "content/docs",
				category: "DevOps & Tools",
			},
			{
				name: "Grafana Docs",
				id: "grafana-docs-repo",
				type: "repo",
				url: "https://github.com/grafana/grafana",
				docPath: "docs/sources",
				category: "DevOps & Tools",
			},
			{
				name: "Nginx Docs (Unofficial Mirror)", // Official docs not on GitHub as a single repo
				id: "nginx-docs-mirror",
				type: "repo",
				url: "https://github.com/nginxinc/nginx-docs", // This is an official repo but for specific products
				docPath: "", // Adjust based on actual content, might be better to link to website
				category: "DevOps & Tools",
			},
			{
				name: "SaltStack Docs",
				id: "saltstack-docs-repo",
				type: "repo",
				url: "https://github.com/saltstack/salt",
				docPath: "doc",
				category: "DevOps & Tools",
			},
			{
				name: "Consul Docs",
				id: "consul-docs-repo",
				type: "repo",
				url: "https://github.com/hashicorp/consul",
				docPath: "website/content/docs",
				category: "DevOps & Tools",
			},
			{
				name: "Nomad Docs",
				id: "nomad-docs-repo",
				type: "repo",
				url: "https://github.com/hashicorp/nomad",
				docPath: "website/content/docs",
				category: "DevOps & Tools",
			},
		],
	},
	{
		name: "Mobile Development",
		id: "mobile-dev-category",
		type: "category",
		children: [
			{
				name: "React Native Docs",
				id: "react-native-docs-repo",
				type: "repo",
				url: "https://github.com/facebook/react-native-website",
				docPath: "docs",
				category: "Mobile Development",
			},
			{
				name: "Flutter Docs",
				id: "flutter-docs-repo",
				type: "repo",
				url: "https://github.com/flutter/website",
				docPath: "src/docs",
				category: "Mobile Development",
			},
			{
				name: "Android Developer Samples",
				id: "android-dev-samples",
				type: "repo",
				url: "https://github.com/android/documentation-samples",
				docPath: "",
				category: "Mobile Development",
			},
			{
				name: "Swift Book (Apple)",
				id: "swift-book-apple",
				type: "repo",
				url: "https://github.com/apple/swift-book",
				docPath: "content",
				category: "Mobile Development",
			},
			{
				name: "Kotlin Docs",
				id: "kotlin-docs-repo",
				type: "repo",
				url: "https://github.com/JetBrains/kotlin-web-site",
				docPath: "docs/topics",
				category: "Mobile Development",
			},
			{
				name: "Ionic Framework Docs",
				id: "ionic-framework-docs-repo",
				type: "repo",
				url: "https://github.com/ionic-team/ionic-docs",
				docPath: "src/pages/docs",
				category: "Mobile Development",
			},
			{
				name: "Xamarin Docs",
				id: "xamarin-docs-repo",
				type: "repo",
				url: "https://github.com/MicrosoftDocs/xamarin-docs",
				docPath: "docs",
				category: "Mobile Development",
			},
			{
				name: "NativeScript Docs",
				id: "nativescript-docs-repo",
				type: "repo",
				url: "https://github.com/NativeScript/docs",
				docPath: "",
				category: "Mobile Development",
			},
			{
				name: "Cordova Docs",
				id: "cordova-docs-repo",
				type: "repo",
				url: "https://github.com/apache/cordova-docs",
				docPath: "www/docs",
				category: "Mobile Development",
			},
			{
				name: "Appium Docs",
				id: "appium-docs-repo",
				type: "repo",
				url: "https://github.com/appium/appium.io",
				docPath: "docs",
				category: "Mobile Development",
			},
			{
				name: "Detox Docs (Gray Box E2E for Mobile)",
				id: "detox-docs-repo",
				type: "repo",
				url: "https://github.com/wix/Detox",
				docPath: "docs",
				category: "Mobile Development",
			},
		],
	},
	{
		name: "Programming Languages (General)",
		id: "prog-lang-general-category",
		type: "category",
		children: [
			{
				name: "Java SE Documentation (OpenJDK)",
				id: "java-se-docs-openjdk",
				type: "repo",
				url: "https://github.com/openjdk/jdk",
				docPath: "doc/api",
				category: "Programming Languages (General)",
			}, // Note: This is complex, linking to API dir
			{
				name: "C# Language Specification",
				id: "csharp-lang-spec",
				type: "repo",
				url: "https://github.com/dotnet/csharplang",
				docPath: "spec",
				category: "Programming Languages (General)",
			},
			{
				name: "Go Documentation",
				id: "go-docs-repo",
				type: "repo",
				url: "https://github.com/golang/go",
				docPath: "doc",
				category: "Programming Languages (General)",
			},
			{
				name: "Rust Programming Language Book",
				id: "rust-book-repo",
				type: "repo",
				url: "https://github.com/rust-lang/book",
				docPath: "src",
				category: "Programming Languages (General)",
			},
			{
				name: "PHP Manual (Source)",
				id: "php-manual-src",
				type: "repo",
				url: "https://github.com/php/doc-en",
				docPath: "reference",
				category: "Programming Languages (General)",
			},
			{
				name: "Ruby Docs",
				id: "ruby-docs-repo",
				type: "repo",
				url: "https://github.com/ruby/ruby",
				docPath: "doc",
				category: "Programming Languages (General)",
			},
			{
				name: "Swift Evolution",
				id: "swift-evolution-repo",
				type: "repo",
				url: "https://github.com/apple/swift-evolution",
				docPath: "proposals",
				category: "Programming Languages (General)",
			},
			{
				name: "Scala Docs",
				id: "scala-docs-repo",
				type: "repo",
				url: "https://github.com/scala/docs.scala-lang",
				docPath: "contents",
				category: "Programming Languages (General)",
			},
			{
				name: "Perl Docs (Perlancar)", // Official docs are not on GitHub in a browseable way
				id: "perl-docs-perlacnar",
				type: "repo",
				url: "https://github.com/perldoc-jp/perldoc.jp", // Example of a community-maintained doc site source
				docPath: "sources/html/en/pod",
				category: "Programming Languages (General)",
			},
			{
				name: "Haskell Language",
				id: "haskell-lang-repo",
				type: "repo",
				url: "https://github.com/ghc/ghc", // Glasgow Haskell Compiler, docs are within
				docPath: "docs/users_guide",
				category: "Programming Languages (General)",
			},
			{
				name: "Elixir Docs",
				id: "elixir-docs-repo",
				type: "repo",
				url: "https://github.com/elixir-lang/elixir-lang.github.com",
				docPath: "getting-started/introduction.md", // Example path
				category: "Programming Languages (General)",
			},
			{
				name: "Clojure Docs",
				id: "clojure-docs-repo",
				type: "repo",
				url: "https://github.com/clojure/clojure-site",
				docPath: "content/guides",
				category: "Programming Languages (General)",
			},
			{
				name: "Lua Reference Manual",
				id: "lua-refman-repo",
				type: "repo",
				url: "https://github.com/lua/lua-org", // Website repo
				docPath: "www/manual/5.4", // Version specific
				category: "Programming Languages (General)",
			},
			{
				name: "Dart Docs",
				id: "dart-docs-repo",
				type: "repo",
				url: "https://github.com/dart-lang/site-www",
				docPath: "src/_guides",
				category: "Programming Languages (General)",
			},
			{
				name: "R Language (R Core)",
				id: "r-lang-core-repo",
				type: "repo",
				url: "https://github.com/wch/r-source", // Mirror of R source
				docPath: "doc/manual",
				category: "Programming Languages (General)",
			},
		],
	},
	{
		name: "Web Standards & APIs",
		id: "web-standards-category",
		type: "category",
		children: [
			{
				name: "MDN Web Docs (General)",
				id: "mdn-web-docs-general",
				type: "repo",
				url: "https://github.com/mdn/content",
				docPath: "files/en-us/web",
				category: "Web Standards & APIs",
			},
			{
				name: "W3C Specifications",
				id: "w3c-specs-repo",
				type: "repo",
				url: "https://github.com/w3c/spec-generator",
				docPath: "examples",
				category: "Web Standards & APIs",
			}, // Example, actual specs are diverse
			{
				name: "WHATWG Standards",
				id: "whatwg-standards-repo",
				type: "repo",
				url: "https://github.com/whatwg/html",
				docPath: "source",
				category: "Web Standards & APIs",
			}, // HTML standard
			{
				name: "GraphQL Spec",
				id: "graphql-spec-repo",
				type: "repo",
				url: "https://github.com/graphql/graphql-spec",
				docPath: "spec",
				category: "Web Standards & APIs",
			},
			{
				name: "OpenAPI Specification",
				id: "openapi-spec-repo",
				type: "repo",
				url: "https://github.com/OAI/OpenAPI-Specification",
				docPath: "versions",
				category: "Web Standards & APIs",
			},
		],
	},
];
