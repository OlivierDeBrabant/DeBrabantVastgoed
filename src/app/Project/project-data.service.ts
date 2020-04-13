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
  
  constructor(private http: HttpClient) { }

  get projects$(): Observable< Project[] > {
    return this.http.get(`${environment.apiUrl}/Projects/`).pipe(
      tap(console.log),
      map(
      (list: any[]): Project[] => list.map(Project.fromJSON)
    ));
  }
  addNewProject(project : Project){
    return this.http.post(`${environment.apiUrl}/Projects/AddProject`, project.toJSON())
        .pipe(map(Project.fromJSON))
        .subscribe();
  }
}
//.pipe(catchError(this.handleError)