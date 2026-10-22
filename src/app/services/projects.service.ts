import { Injectable } from '@angular/core';
import { ProjectModel } from '../models/project.model';
import { TagModel } from '../models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  projects: ProjectModel[] = [
      {id: 0, title: "Sample Python Project", pictures: ["/assets/img/Image1.png","/assets/img/Image2.png","/assets/img/Image3.png"], projectUrl: "//www.github.com", summary: "Python project that analyzes stock market data.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [TagModel.PYTHON]},
      {id: 1, title: "Sample Angular App", pictures: ["/assets/img/Image1.png","/assets/img/Image2.png","/assets/img/Image3.png"], projectUrl: "//www.github.com", summary: "Fullstack web app developed using Angular and Node.JS", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [TagModel.ANGULAR, TagModel.TYPESCRIPT, TagModel.NODEJS]},
      {id: 2, title: "Sample .Net App", pictures: ["/assets/img/Image1.png","/assets/img/Image2.png","/assets/img/Image3.png"], projectUrl: "//www.github.com", summary: "Fullstack web app developed using React and ASP.NET", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi to aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [TagModel.REACT ,TagModel.CSHARP, TagModel.ASPNET]},
      {id: 3, title: "Web API Project", pictures: ["/assets/img/Image1.png","/assets/img/Image2.png","/assets/img/Image3.png"], projectUrl: "//www.github.com", summary: "Web API Project that was developed for a class project.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi to aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [TagModel.CSHARP, TagModel.ASPNET]},
      {id: 4, title: "Chrome Extension", pictures: ["/assets/img/Image1.png","/assets/img/Image2.png","/assets/img/Image3.png"], projectUrl: "//www.github.com", summary: "Developed a chrome extension that tracks the prices of furniture.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt in labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi to aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [TagModel.JAVASCRIPT]},
      {id: 5, title: "Mobile App", pictures: ["/assets/img/Image1.png","/assets/img/Image2.png","/assets/img/Image3.png"], projectUrl: "//www.github.com", summary: "Mobile app developed in java that tracks the departure and arrival of trains.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt in labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi to aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: [TagModel.JAVA]}
    ];
  
  GetProjects(): ProjectModel[] {
    return this.projects;
  }

  GetProjectById(id: number): ProjectModel | undefined {
    const project = this.projects.find(project => project.id === id);
    if (!project) {
      console.error(`Project with id ${id} not found.`);
      return undefined;
    }

    return project;
  }
}
