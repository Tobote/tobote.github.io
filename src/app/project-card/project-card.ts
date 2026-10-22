import { Component, inject, input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectModel } from '../models/project.model';
import { ProjectDialog } from './project-dialog/project-dialog';

@Component({
  selector: 'app-project-card',
  imports: [MatDialogModule, MatIconModule, TranslatePipe],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  readonly project = input.required<ProjectModel>();
  private readonly dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog.open(ProjectDialog, {
      data: this.project(),
      width: '700px',
      maxWidth: '95vw',
    });
  }
}
