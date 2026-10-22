import { Component, inject } from '@angular/core';
import { ProjectModel } from '../../models/project.model';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Carousel } from '../../carousel/carousel';

@Component({
  selector: 'app-project-dialog',
  imports: [MatDialogModule, Carousel],
  templateUrl: './project-dialog.html',
  styleUrl: './project-dialog.css',
})
export class ProjectDialog {
  readonly data = inject<ProjectModel>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<ProjectDialog>);
  close(): void {
    this.dialogRef.close();
  }
}
