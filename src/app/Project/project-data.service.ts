import { Injectable } from '@angular/core';
import { PROJECTS } from './mock-projects';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {
  private _projects = PROJECTS;
  constructor() { }

  get projects(){
    return this._projects;
  }
  addNewProject(project : Project){
    this._projects.push(project);
  }
}
