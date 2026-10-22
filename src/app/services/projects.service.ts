import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { ProjectModel } from '../models/project.model';
import { TagModel } from '../models/tag.model';

/** Project as stored in the i18n JSON files: tags are plain names like "Angular". */
type ProjectJson = Omit<ProjectModel, 'tags'> & { tags: string[] };

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly translate = inject(TranslateService);

  // stream() re-emits when the language changes; it returns the key itself if missing.
  readonly projects = toSignal(
    this.translate.stream('portfolio.projects').pipe(
      map((value) => (Array.isArray(value) ? (value as ProjectJson[]) : [])),
      map((projects) =>
        projects.map(
          (project): ProjectModel => ({
            ...project,
            tags: project.tags
              .map((key) => TagModel.fromKey(key))
              .filter((tag): tag is TagModel => !!tag),
          }),
        ),
      ),
    ),
    { initialValue: [] as ProjectModel[] },
  );

  GetProjectById(id: number): ProjectModel | undefined {
    const project = this.projects().find((project) => project.id === id);
    if (!project) {
      console.error(`Project with id ${id} not found.`);
      return undefined;
    }

    return project;
  }
}
