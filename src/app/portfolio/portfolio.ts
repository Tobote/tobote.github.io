import { Component, computed, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectCard } from '../project-card/project-card';
import { TagModel } from '../models/tag.model';
import { ProjectsService } from '../services/projects.service';

const LANGUAGES: TagModel[] = [
  TagModel.TYPESCRIPT,
  TagModel.JAVASCRIPT,
  TagModel.PYTHON,
  TagModel.JAVA,
  TagModel.CSHARP,
  TagModel.HTML,
  TagModel.CSS,
];

const FRAMEWORKS: TagModel[] = [
  TagModel.ANGULAR,
  TagModel.REACT,
  TagModel.NODEJS,
  TagModel.ASPNET,
];

@Component({
  selector: 'app-portfolio',
  imports: [ProjectCard, TranslatePipe],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  private readonly projectsService = inject(ProjectsService);

  protected readonly filterGroups = [
    { label: 'portfolio.filters.languages', tags: LANGUAGES },
    { label: 'portfolio.filters.frameworks', tags: FRAMEWORKS },
  ];

  protected readonly projects = this.projectsService.projects;
  protected readonly selectedTags = signal<ReadonlySet<TagModel>>(new Set());

  // A project matches when it has at least one of the selected tags.
  protected readonly filteredProjects = computed(() => {
    const selected = this.selectedTags();
    if (selected.size === 0) {
      return this.projects();
    }

    return this.projects().filter((project) => project.tags.some((tag) => selected.has(tag)));
  });

  protected toggleTag(tag: TagModel): void {
    this.selectedTags.update((current) => {
      const next = new Set(current);
      if (!next.delete(tag)) {
        next.add(tag);
      }
      return next;
    });
  }

  protected clearFilters(): void {
    this.selectedTags.set(new Set());
  }
}
