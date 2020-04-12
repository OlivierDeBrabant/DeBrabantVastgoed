import { Injectable } from '@angular/core';
import { PROJECTS } from './mock-projects';
import { Project } from './project.model';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {
  //private _projects = PROJECTS;
  constructor(private http: HttpClient) { }

  /*get projects(){
    return this._projects;
  }*/
  get projects$(): Observable< Project[] > {
    return this.http.get(`${environment.apiUrl}/Projects/`).pipe(
      tap(console.log),
      map(
      (list: any[]): Project[] => list.map(Project.fromJSON)
    ));
  }
  addNewProject(project : Project){
    //this._projects.push(project);
  }
}
