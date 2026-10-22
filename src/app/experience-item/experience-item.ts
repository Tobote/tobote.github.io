import { Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ExperienceModel } from '../models/experience.model';

@Component({
  selector: 'app-experience-item',
  imports: [TranslatePipe],
  templateUrl: './experience-item.html',
  styleUrl: './experience-item.css',
})
export class ExperienceItem {
  readonly experience = input.required<ExperienceModel>();

  protected readonly start = computed(() => this.formatMonth(this.experience().startDate));
  protected readonly end = computed(() => {
    const endDate = this.experience().endDate;
    return endDate ? this.formatMonth(endDate) : undefined;
  });

  // Counts both the start and end months, so 10/2020 - 04/2022 is 1 year and 7 months.
  protected readonly duration = computed(() => {
    const { startDate, endDate } = this.experience();
    const [startYear, startMonth] = startDate.split('-').map(Number);
    const now = new Date();
    const [endYear, endMonth] = endDate
      ? endDate.split('-').map(Number)
      : [now.getFullYear(), now.getMonth() + 1];
    const total = Math.max((endYear - startYear) * 12 + (endMonth - startMonth) + 1, 1);

    return { years: Math.floor(total / 12), months: total % 12 };
  });

  private formatMonth(date: string): string {
    const [year, month] = date.split('-');
    return `${month}/${year}`;
  }
}
