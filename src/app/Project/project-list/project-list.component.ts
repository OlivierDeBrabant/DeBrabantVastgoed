import { Component, OnInit } from '@angular/core';
import { Project } from '../project.model';
import { ProjectDataService } from '../project-data.service'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent {
  private _projects: Project[];
  private _fetchProjects$: Observable<Project[]> 
    = this._projectDataService.projects$;

  constructor(private _projectDataService: ProjectDataService) {
  }

  /*get projects(): Project[] {
    return this._projects;
  }*/
  get projects$(): Observable<Project[]> {
    return this._fetchProjects$;
  }
  addNewProject(project) {
    this._projectDataService.addNewProject(project);
  }
}
