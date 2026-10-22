import { Component, inject, Input } from '@angular/core';
import { ProjectModel } from '../models/project.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProjectDialog } from './project-dialog/project-dialog';

@Component({
  selector: 'app-project-card',
  imports: [MatDialogModule],
  standalone: true,
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  @Input() project: ProjectModel | null = null;
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(ProjectDialog, {
      data: this.project,
      width: '700px',
      maxWidth: '95vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
