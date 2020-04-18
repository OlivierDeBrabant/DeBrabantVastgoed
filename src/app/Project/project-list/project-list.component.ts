import { Component, OnInit } from '@angular/core';
import { Project } from '../project.model';
import { ProjectDataService } from '../project-data.service'
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent {
  private _projects: Project[];
  private _fetchProjects$: Observable<Project[]> 
    = this._projectDataService.projects$;
    
  public errorMessage: string = '';

  constructor(private _projectDataService: ProjectDataService) {
  }

  ngOnInit():void{
    this._fetchProjects$ = this._projectDataService.allProjects$.pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
  }
  /*get projects(): Project[] {
    return this._projects;
  }*/
  get projects$(): Observable<Project[]> {
    return this._fetchProjects$;
  }
}
