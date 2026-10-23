// Full class names are listed so Tailwind can find them when scanning the source.
const COLOR_CLASSES: Record<string, string> = {
    red: 'bg-red-50 text-red-700 ring-red-200',
    blue: 'bg-blue-50 text-blue-700 ring-blue-200',
    green: 'bg-green-50 text-green-700 ring-green-200',
    cyan: 'bg-cyan-50 text-cyan-700 ring-cyan-200',
    yellow: 'bg-yellow-50 text-yellow-800 ring-yellow-200',
    orange: 'bg-orange-50 text-orange-700 ring-orange-200',
    purple: 'bg-purple-50 text-purple-700 ring-purple-200',
};

export class TagModel {
    private static readonly all = new Map<string, TagModel>();
    /** Tags indexed by a normalised name, plus aliases for GitHub topics (which can't contain "#"). */
    private static readonly byGitHubName = new Map<string, TagModel>();

    static readonly ANGULAR = new TagModel('Angular', 'red');
    static readonly TYPESCRIPT = new TagModel('TypeScript', 'blue');
    static readonly NODEJS = new TagModel('Node.js', 'green');
    static readonly REACT = new TagModel('React', 'cyan');
    static readonly PYTHON = new TagModel('Python', 'yellow');
    static readonly JAVA = new TagModel('Java', 'orange');
    static readonly CSHARP = new TagModel('C#', 'purple');
    static readonly ASPNET = new TagModel('ASP.NET', 'purple');
    static readonly JAVASCRIPT = new TagModel('JavaScript', 'yellow');
    static readonly HTML = new TagModel('HTML', 'orange');
    static readonly CSS = new TagModel('CSS', 'blue');
    static readonly DOTNET = new TagModel('.NET', 'purple');
    static readonly RABBITMQ = new TagModel('RabbitMQ', 'orange');
    static readonly CLAUDE = new TagModel('Claude', 'orange');

    private constructor(
        private readonly key: string,
        public readonly color: string
    ) {
        TagModel.all.set(key, this);
        TagModel.byGitHubName.set(TagModel.normalize(key), this);
    }

    static {
        TagModel.byGitHubName.set('csharp', TagModel.CSHARP);
        TagModel.byGitHubName.set('dotnet', TagModel.DOTNET);
    }

    /** Finds a tag by its name, e.g. "Angular". Used to read tags from the i18n JSON files. */
    static fromKey(key: string): TagModel | undefined {
        return TagModel.all.get(key);
    }

    /** Finds a tag from a GitHub language ("C#") or topic ("nodejs", "csharp"), ignoring case and punctuation. */
    static fromGitHub(name: string): TagModel | undefined {
        return TagModel.byGitHubName.get(TagModel.normalize(name));
    }

    private static normalize(name: string): string {
        return name.toLowerCase().replace(/[^a-z0-9#]/g, '');
    }

    /** Tailwind classes for the tag's colour (background, text and ring). */
    get classes(): string {
        return COLOR_CLASSES[this.color] ?? 'bg-gray-100 text-gray-700 ring-gray-200';
    }

    toString(): string {
        return this.key;
    }
}
