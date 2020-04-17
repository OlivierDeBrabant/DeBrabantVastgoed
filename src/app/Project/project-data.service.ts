import { Injectable } from '@angular/core';
import { Project } from './project.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Product } from './product.model';

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
  getProject$(id: string) {
    return this.http
      .get(`${environment.apiUrl}/Projects/${id}`)
      .pipe(catchError(this.handleError), map(Project.fromJSON));
  }
  addNewProduct(id: string, product: Product){
    return this.http.post(`${environment.apiUrl}/Projects/${id}/AddProduct`, product.toJSON())
        .pipe(map(Product.fromJSON))
        .subscribe();
  }
  editProject(id: string, project: Project){
    console.log(project._projectID + "ID: " + id)
    console.log("naam: " + project.naam )
    console.log("beschrijving: " + project.beschrijving)
    console.log("adres: " + project.adres)
    
    return this.http.put(`${environment.apiUrl}/Projects/${id}`, project.toJSONMetProducten())
        .pipe(map(Project.fromJSON))
        .subscribe();
  }
  handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else if (err instanceof HttpErrorResponse) {
      console.log(err);
      errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
      errorMessage = err;
    }
    return throwError(errorMessage);
  }
}
//.pipe(catchError(this.handleError)