import { Component, OnInit, computed, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormField, form } from '@angular/forms/signals';
import { ProjectCard } from '../project-card/project-card';
import { ProjectModel } from '../models/project.model';
import { TagModel } from '../models/tag.model';
import { ProjectsService } from '../services/projects.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

interface FilterModel {
  languages: Record<string, boolean>;
  frameworks: Record<string, boolean>;
}

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

const toFilterGroup = (tags: TagModel[]): Record<string, boolean> =>
  Object.fromEntries(tags.map(tag => [tag.toString(), false]));

@Component({
  selector: 'app-portfolio',
  imports: [ProjectCard, FormField, NgClass, MatButtonModule, MatExpansionModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio implements OnInit{
  readonly languages = LANGUAGES.map(tag => tag.toString());
  readonly frameworks = FRAMEWORKS.map(tag => tag.toString());

  projects = signal<ProjectModel[]>([]);
  isCollapsed: boolean = true;

  filterModel = signal<FilterModel>({
    languages: toFilterGroup(LANGUAGES),
    frameworks: toFilterGroup(FRAMEWORKS),
  });
  filterForm = form(this.filterModel);

  hasActiveFilters = computed(() => {
    const { languages, frameworks } = this.filterModel();
    return Object.values(languages).some(Boolean) || Object.values(frameworks).some(Boolean);
  });

  filteredProjects = computed(() => {
    const { languages, frameworks } = this.filterModel();
    const selected = [...Object.entries(languages), ...Object.entries(frameworks)]
      .filter(([, checked]) => checked)
      .map(([key]) => key);

    if (selected.length === 0) {
      return this.projects();
    }

    return this.projects().filter(project =>
      project.tags.some(tag => selected.includes(tag.toString()))
    );
  });

  constructor(private projectsService: ProjectsService) {

  }
  ngOnInit(): void {
    this.projects.set(this.projectsService.GetProjects());
  }

  clearFilters(): void {
    this.filterModel.set({
      languages: toFilterGroup(LANGUAGES),
      frameworks: toFilterGroup(FRAMEWORKS),
    });
  }
}
