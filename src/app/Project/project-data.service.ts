import { Injectable } from '@angular/core';
import { Project } from './project.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, tap, catchError, shareReplay } from 'rxjs/operators';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {
  private _projects: Project[];
  private _projects$ =  new BehaviorSubject<Project[]>([]);

  constructor(private http: HttpClient) { 
    this.projects$
      .pipe(
        catchError(err => {
          // temporary fix, while we use the behaviorsubject as a cache stream
          this._projects$.error(err);
          return throwError(err);
        })
      )
      .subscribe((recipes: Project[]) => {
        this._projects = recipes;
        this._projects$.next(this._projects);
      });
  }

  get allRecipes$(): Observable<Project[]> {
    return this._projects$;
  }

  get projects$(): Observable< Project[] > {
    return this.http.get(`${environment.apiUrl}/Projects/`).pipe(
      tap(console.log),
      shareReplay(1),
      catchError(this.handleError),
      map(
      (list: any[]): Project[] => list.map(Project.fromJSON)
    ));
  }
  addNewProject(project : Project){
    return this.http.post(`${environment.apiUrl}/Projects/AddProject`, project.toJSON())
        .pipe( tap(console.log), catchError(this.handleError),map(Project.fromJSON))
        .pipe(
          // temporary fix, while we use the behaviorsubject as a cache stream
          catchError(err => {
            this._projects$.error(err);
            return throwError(err);
          })
        )
        .subscribe((proj: Project) => {
          this._projects = [...this._projects, proj];
          this._projects$.next(this._projects);
        });
  }
  getProject$(id: string) {
    return this.http
      .get(`${environment.apiUrl}/Projects/${id}`)
      .pipe(catchError(this.handleError), catchError(this.handleError), map(Project.fromJSON));
  }
  addNewProduct(id: string, product: Product){
    return this.http.post(`${environment.apiUrl}/Projects/${id}/AddProduct`, product.toJSON())
        .pipe(tap(console.log), catchError(this.handleError), map(Product.fromJSON))
        .pipe(
          // temporary fix, while we use the behaviorsubject as a cache stream
          catchError(err => {
            this._projects$.error(err);
            return throwError(err);
          })
        )
        .subscribe();
  }
  editProject(id: string, project: Project){
    return this.http.put(`${environment.apiUrl}/Projects/${id}`, project.toJSONMetProducten())
        .pipe(map(Project.fromJSON))
        .subscribe();
  }
  editProduct(id: string, prodId: string, product: Product){
    return this.http.put(`${environment.apiUrl}/Projects/${id}/products/${prodId}`, product.toJSON())
        .pipe(map(Product.fromJSON))
        .subscribe();
  }
  deleteProject(project: Project){
    console.log('Verwijderen')
    console.log(project._projectID)
    return this.http
      .delete(`${environment.apiUrl}/Projects/${project._projectID}`)
      .pipe(tap(console.log), catchError(this.handleError))
      .subscribe(() => {
        this._projects = this._projects.filter(proj => proj.projectID != project.projectID);
        this._projects$.next(this._projects);
      });
  }
  deleteProduct(id: string, prodId: string, product: Product){
    console.log('Verwijderen')
    console.log(product._productID)
    return this.http
      .delete(`${environment.apiUrl}/Projects/${id}/products/${prodId}`)
      .pipe(tap(console.log), catchError(this.handleError))
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