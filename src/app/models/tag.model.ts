export class TagModel {
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

    private constructor(
        private readonly key: string,
        public readonly color: string
    ) {}

    toString(): string {
        return this.key;
    }
}