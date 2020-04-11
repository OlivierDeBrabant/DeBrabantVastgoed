import { Component, OnInit } from '@angular/core';
import { PROJECTS } from '../mock-projects'
import { Project } from '../project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  private _projects = PROJECTS;
  constructor() { }

  get projects(){
    return this._projects;
  }
  ngOnInit(): void {
    //console.log(this.projects);
  }
  addNewProject(project : Project){
    this._projects.push(project);
  }
}
