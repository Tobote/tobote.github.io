import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { Carousel } from '../carousel/carousel';
import { ExperienceModel } from '../models/experience.model';
import { ProjectModel } from '../models/project.model';
import { ProjectDialog } from '../project-card/project-dialog/project-dialog';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-home',
  imports: [TranslatePipe, Carousel, RouterLink, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly projectService = inject(ProjectsService);
  private readonly translate = inject(TranslateService);
  private readonly dialog = inject(MatDialog);

  // Undefined until the translations (which hold the projects) have loaded.
  protected readonly featuredProject = computed<ProjectModel | undefined>(() => {
    const projects = this.projectService.projects();
    return projects.find((project) => project.featured) ?? projects[0];
  });

  // stream() re-emits when the language changes; it returns the key itself if missing.
  private readonly experiences = toSignal(
    this.translate
      .stream('resume.experience')
      .pipe(map((value) => (Array.isArray(value) ? (value as ExperienceModel[]) : []))),
    { initialValue: [] as ExperienceModel[] },
  );

  // Derived from the resume data so the numbers stay current without manual updates.
  protected readonly stats = computed(() => {
    const experiences = this.experiences();
    const firstStart = experiences.map((experience) => experience.startDate).sort()[0];
    const technologies = experiences.flatMap((experience) => [
      ...(experience.technologies ?? []),
      ...(experience.projects ?? []).flatMap((project) => project.technologies ?? []),
    ]);

    return {
      years: firstStart ? this.yearsSince(firstStart) : 0,
      companies: new Set(experiences.map((experience) => experience.company)).size,
      technologies: new Set(technologies).size,
    };
  });

  protected openFeaturedProject(): void {
    this.dialog.open(ProjectDialog, {
      data: this.featuredProject(),
      width: '700px',
      maxWidth: '95vw',
    });
  }

  private yearsSince(date: string): number {
    const [year, month] = date.split('-').map(Number);
    const now = new Date();
    const months = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
    return Math.floor(months / 12);
  }
}
