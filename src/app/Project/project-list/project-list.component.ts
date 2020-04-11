import { Component, OnInit } from '@angular/core';
import { Project } from '../project.model';
import { ProjectDataService } from '../project-data.service'
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent {
  constructor(private _projectDataService: ProjectDataService) {}

  get projects(): Project[] {
    return this._projectDataService.projects;
  }
  addNewProject(project) {
    this._projectDataService.addNewProject(project);
  }
}
