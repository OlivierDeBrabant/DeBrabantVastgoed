import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../project.model';
import { ProjectDataService } from '../project-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-overzicht',
  templateUrl: './project-overzicht.component.html',
  styleUrls: ['./project-overzicht.component.css']
})
export class ProjectOverzichtComponent implements OnInit {

  private _fetchProjects$: Observable<Project[]> 
    = this._projectDataService.projects$;

  constructor(private _projectDataService: ProjectDataService, private _router: Router) { }

  ngOnInit(): void {
  }

  get projects$(): Observable<Project[]> {
    return this._fetchProjects$;
  }
  deleteProject(project: Project){
    this._router.navigate(['contact'])
  } 
  editProject(project: Project){
    this._router.navigate(['editProject'])
  }
  addProduct(project: Project){

  }
}
