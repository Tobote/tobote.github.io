# Personal Portfolio Website

A bilingual (English / Portuguese) personal portfolio built with **Angular 21**, **Tailwind CSS 4** and **Angular Material**.
Almost all of the content (resume, projects, contact info and texts) lives in two JSON files, so you can turn it into your own portfolio mostly by editing data, not code.
It deploys to **GitHub Pages** automatically on every push.

## Features

- **Home**: intro with photo and call-to-action buttons, stats calculated from your resume (years of experience, companies, technologies), featured project.
- **Portfolio**: project cards with images, technology filters and a details dialog with an image carousel.
- **Resume**: work experience timeline with automatic durations ("1 year and 7 months"), education, courses, skill groups and a PDF download per language.
- **Contact**: email card with a copy button, plus social media links.
- **Two languages**: chosen from the visitor's browser, switchable with the EN / PT toggle in the header, and remembered on the next visit.
- **Responsive**: mobile menu and layouts for phones and desktops.
- **Automatic deploy** to GitHub Pages with GitHub Actions.

## Quick start

You need [Node.js](https://nodejs.org/) 22 or newer.

```bash
git clone https://github.com/<your-user>/<your-repo>.git
cd <your-repo>
npm install
npm start
```

Open http://localhost:4200/. The page reloads automatically when you save a file.

## Make it yours

### 1. Your content: `src/assets/i18n/en.json` and `pt.json`

Each file holds all the text for one language. Edit both and keep the same structure in each.

| Section | What it controls |
| --- | --- |
| `header.role` | The role shown under your name in the header |
| `home` | Greeting, headline, biography and the button labels |
| `resume.experience` | Your jobs (see the example below) |
| `resume.education`, `resume.courses` | Degrees and extra courses |
| `resume.skills` | Skill cards: a `category` and a list of `items` |
| `resume.pdf` | Which PDF the download button serves, and its file name |
| `portfolio.projects` | Your projects (see the example below) |
| `contact.items` | Contact cards such as email |
| `contact.social` | Social media links |

**A job in `resume.experience`** (newest first):

```json
{
  "role": "Fullstack Developer",
  "company": "Acme Inc.",
  "location": "Remote",
  "startDate": "2023-01",
  "endDate": "2024-06",
  "summary": "One or two sentences about the role.",
  "highlights": ["What you did", "Another achievement"],
  "projects": [{ "name": "Project X", "description": "What it was about", "technologies": ["Angular"] }],
  "technologies": ["Angular", "C#"]
}
```

- Dates use the `YYYY-MM` format. The page shows them as `01/2023` and calculates the duration.
- Leave out `endDate` for your current job: it shows as "Present" and the duration counts up to today.
- `summary`, `highlights`, `projects`, `technologies` and `location` are optional.

**A project in `portfolio.projects`:**

```json
{
  "id": 0,
  "title": "My App",
  "summary": "Short text shown on the card.",
  "description": "Longer text shown in the details dialog.",
  "projectUrl": "https://github.com/you/my-app",
  "pictures": ["assets/img/my-app-1.png", "assets/img/my-app-2.png"],
  "tags": ["Angular", "TypeScript"],
  "featured": true
}
```

- `id` must be unique.
- `featured: true` picks the project shown on the Home page. Without it, the first project is used.
- `tags` must match tags defined in `src/app/models/tag.model.ts` (see [Technology tags](#technology-tags)). Unknown tags are skipped.

**A contact item and a social link:**

```json
"items": [
  { "icon": "email", "label": "Email", "value": "you@example.com", "url": "mailto:you@example.com", "copyable": true }
],
"social": [
  { "name": "LinkedIn", "icon": "linkedin", "url": "https://www.linkedin.com/in/you/" },
  { "name": "GitHub", "icon": "github", "url": "https://github.com/you" }
]
```

- `icon` in `items` is any [Material Icons](https://fonts.google.com/icons) name, such as `email`, `phone` or `location_on`.
- `icon` in `social` must be a logo registered in `src/app/social-link/social-link.ts`. `linkedin` and `github` are included. To add another network, paste its SVG into `BRAND_ICONS` in that file.
- To hide the social section, use an empty list: `"social": []`.

### 2. Your files: `src/assets/`

| File | What to do |
| --- | --- |
| `img/eu.jpg` | Replace it with your photo (square works best), keeping the same name, or change the path in `src/app/home/home.html` |
| `img/` | Add your project screenshots and reference them in `pictures` |
| `pdf/resume.pdf`, `pdf/resume_en.pdf` | Your resume in Portuguese and English |

> **Everything in `src/assets/` is public** once the site is deployed, and it is also visible in your repository. Don't publish your phone number, home address or documents marked confidential.

### 3. Your name in the code

A few places show the site owner's name directly:

| File | What to change |
| --- | --- |
| `src/app/header/header.html` | Your name and the initials in the circle logo ("CP") |
| `src/app/footer/footer.html` | The name in the copyright line |
| `src/app/services/translated-title.strategy.ts` | `SITE_NAME`, used in the browser tab title |
| `src/index.html` | `<title>`, shown before the app loads |
| `src/app/app.ts` | `title` |

### Technology tags

The colored tags and the Portfolio filters come from `src/app/models/tag.model.ts`:

```ts
static readonly VUE = new TagModel('Vue', 'green');
```

- The first value is the name you use in `tags` in the JSON.
- The second is the color: `red`, `blue`, `green`, `cyan`, `yellow`, `orange` or `purple`.
- To show a new tag as a filter, add it to `LANGUAGES` or `FRAMEWORKS` in `src/app/portfolio/portfolio.ts`.

### Languages

- The app picks Portuguese for browsers set to any `pt` language and English otherwise. The logic is in `src/app/services/language.service.ts`.
- The EN / PT toggle in the header saves the visitor's choice.
- To test the other language, just click the toggle.

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

1. Push the code to a GitHub repository.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. If your repository is **not** called `PortfolioWebsite`, replace `/PortfolioWebsite/` with `/<your-repo-name>/` in the `build:pages` script in `package.json`. GitHub Pages serves the site under that path.
4. Push to `main`. Follow the progress in the **Actions** tab. When it finishes, the site is at `https://<your-user>.github.io/<your-repo-name>/`.

You can also start a deploy by hand from **Actions → Deploy to GitHub Pages → Run workflow**.

> Using a custom domain or a `<your-user>.github.io` repository? Then the site is served from the root: change the script to `ng build --base-href /`.

## Commands

| Command | What it does |
| --- | --- |
| `npm start` | Runs the site locally at http://localhost:4200/ |
| `npm run build` | Production build into `dist/PortfolioWebsite/browser/` |
| `npm run build:pages` | Same, with the base path used by GitHub Pages |
| `npm test` | Runs the unit tests with [Vitest](https://vitest.dev/) |

## Project structure

```
src/
├── app/
│   ├── home/ portfolio/ resume/ contact/      # one folder per page
│   ├── header/ nav/ footer/                   # layout shown on every page
│   ├── experience-item/ education-item/       # small components that receive
│   ├── skill-group/ contact-item/             #   their data through an input()
│   ├── social-link/ project-card/ carousel/
│   ├── models/                                # TypeScript shapes of the JSON data
│   └── services/                              # projects, language and page title
├── assets/
│   ├── i18n/   # en.json, pt.json: all the content
│   ├── img/    # photo and project screenshots
│   └── pdf/    # downloadable resumes
├── material-theme.scss                        # Angular Material theme and page background
└── styles.css                                 # Tailwind import
```

## Built with

- [Angular 21](https://angular.dev/): signals, standalone components and the new control flow (`@if`, `@for`)
- [Tailwind CSS 4](https://tailwindcss.com/) for styling
- [Angular Material](https://material.angular.dev/) for icons, dialogs and the resume accordion
- [ngx-translate](https://github.com/ngx-translate/core) for translations
