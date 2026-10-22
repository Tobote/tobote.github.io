import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { EducationItem } from '../education-item/education-item';
import { ExperienceItem } from '../experience-item/experience-item';
import { EducationModel } from '../models/education.model';
import { ExperienceModel } from '../models/experience.model';
import { SkillGroupModel } from '../models/skill-group.model';
import { SkillGroup } from '../skill-group/skill-group';

@Component({
  selector: 'app-resume',
  imports: [
    MatButtonModule,
    MatExpansionModule,
    TranslatePipe,
    ExperienceItem,
    EducationItem,
    SkillGroup,
  ],
  templateUrl: './resume.html',
  styleUrl: './resume.css',
})
export class Resume {
  private readonly translate = inject(TranslateService);

  protected readonly experiences = this.translatedList<ExperienceModel>('resume.experience');
  protected readonly education = this.translatedList<EducationModel>('resume.education');
  protected readonly courses = this.translatedList<string>('resume.courses');
  protected readonly skills = this.translatedList<SkillGroupModel>('resume.skills');

  // stream() re-emits when the language changes; it returns the key itself if missing.
  private translatedList<T>(key: string): Signal<T[]> {
    return toSignal(
      this.translate
        .stream(key)
        .pipe(map((value) => (Array.isArray(value) ? (value as T[]) : []))),
      { initialValue: [] as T[] },
    );
  }
}
