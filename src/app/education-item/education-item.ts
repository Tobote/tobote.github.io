import { Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { EducationModel } from '../models/education.model';

@Component({
  selector: 'app-education-item',
  imports: [TranslatePipe],
  templateUrl: './education-item.html',
  styleUrl: './education-item.css',
})
export class EducationItem {
  readonly education = input.required<EducationModel>();

  protected readonly start = computed(() => this.formatMonth(this.education().startDate));
  protected readonly end = computed(() => {
    const endDate = this.education().endDate;
    return endDate ? this.formatMonth(endDate) : undefined;
  });

  private formatMonth(date: string): string {
    const [year, month] = date.split('-');
    return `${month}/${year}`;
  }
}
