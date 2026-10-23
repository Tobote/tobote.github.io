import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { catchError, map, of } from 'rxjs';
import { ProjectModel } from '../models/project.model';
import { TagModel } from '../models/tag.model';

/** GitHub user whose public repositories are listed on the Portfolio page. */
const GITHUB_USER = 'Tobote';
/** Repositories with this topic are shown on the Home page. */
const FEATURED_TOPIC = 'featured';
/** Repositories with this topic are left out of the portfolio. */
const HIDDEN_TOPIC = 'portfolio-hide';

/**
 * Project as stored in the i18n JSON files: tags are plain names like "Angular".
 * With `repo` set, the entry is merged with that GitHub repository and every other field is optional:
 * the JSON values win, GitHub fills in the rest.
 */
type ProjectJson = Partial<Omit<ProjectModel, 'tags'>> & { repo?: string; tags?: string[] };

/** The fields we use from https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user */
interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly translate = inject(TranslateService);
  private readonly http = inject(HttpClient);

  // stream() re-emits when the language changes; it returns the key itself if missing.
  private readonly curated = toSignal(
    this.translate
      .stream('portfolio.projects')
      .pipe(map((value) => (Array.isArray(value) ? (value as ProjectJson[]) : []))),
    { initialValue: [] as ProjectJson[] },
  );

  // Empty until the request finishes, and if it fails (offline, rate limit), so the JSON projects still show.
  private readonly repos = toSignal(
    this.http
      .get<GitHubRepo[]>(`https://api.github.com/users/${GITHUB_USER}/repos`, {
        params: { sort: 'pushed', per_page: 100 },
      })
      .pipe(
        map((repos) =>
          repos.filter(
            (repo) =>
              !repo.fork &&
              !repo.archived &&
              !repo.topics?.includes(HIDDEN_TOPIC) &&
              repo.name.toLowerCase() !== `${GITHUB_USER}.github.io`.toLowerCase(),
          ),
        ),
        catchError((error) => {
          console.error('Could not load GitHub repositories.', error);
          return of([] as GitHubRepo[]);
        }),
      ),
    { initialValue: [] as GitHubRepo[] },
  );

  // JSON projects first, in file order, then the remaining repositories, most recently pushed first.
  readonly projects = computed<ProjectModel[]>(() => {
    const repos = this.repos();
    const byName = new Map(repos.map((repo) => [repo.name.toLowerCase(), repo]));
    const used = new Set<GitHubRepo>();

    const curated = this.curated().map((project) => {
      const repo = project.repo ? byName.get(project.repo.toLowerCase()) : undefined;
      if (repo) {
        used.add(repo);
      }
      return this.toProject(project, repo);
    });

    const fromGitHub = repos
      .filter((repo) => !used.has(repo))
      .map((repo) => this.toProject({}, repo));

    return [...curated, ...fromGitHub];
  });

  GetProjectById(id: number): ProjectModel | undefined {
    const project = this.projects().find((project) => project.id === id);
    if (!project) {
      console.error(`Project with id ${id} not found.`);
      return undefined;
    }

    return project;
  }

  private toProject(project: ProjectJson, repo?: GitHubRepo): ProjectModel {
    const tags = project.tags
      ? project.tags.map((key) => TagModel.fromKey(key))
      : [repo?.language, ...(repo?.topics ?? [])].map((name) =>
          name ? TagModel.fromGitHub(name) : undefined,
        );
    const description = repo?.description ?? '';

    return {
      id: project.id ?? repo?.id ?? -1,
      title: project.title ?? repo?.name ?? project.repo ?? '',
      summary: project.summary ?? description,
      description: project.description ?? project.summary ?? description,
      projectUrl: project.projectUrl ?? repo?.html_url ?? '',
      // GitHub's social preview card, so every repository has an image.
      pictures:
        project.pictures ??
        (repo ? [`https://opengraph.githubassets.com/1/${GITHUB_USER}/${repo.name}`] : []),
      tags: [...new Set(tags.filter((tag): tag is TagModel => !!tag))],
      featured: project.featured ?? repo?.topics?.includes(FEATURED_TOPIC),
    };
  }
}
