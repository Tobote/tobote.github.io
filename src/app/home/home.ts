import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectsService } from '../services/projects.service';
import { ProjectModel } from '../models/project.model';
import { Carousel } from '../carousel/carousel';
@Component({
  selector: 'app-home',
  imports: [TranslatePipe, Carousel],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  featuredProject: ProjectModel | null = null ;
  constructor(private projectService: ProjectsService) {
    
  }
  ngOnInit(): void {
    this.featuredProject = this.projectService.GetProjects()[0];
  }
}
