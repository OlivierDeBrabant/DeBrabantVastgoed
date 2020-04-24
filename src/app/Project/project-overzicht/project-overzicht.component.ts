import { Component, OnInit } from "@angular/core";
import { Observable, EMPTY } from "rxjs";
import { Project } from "../project.model";
import { ProjectDataService } from "../project-data.service";
import { Router } from "@angular/router";
import { catchError } from 'rxjs/operators';

@Component({
  selector: "app-project-overzicht",
  templateUrl: "./project-overzicht.component.html",
  styleUrls: ["./project-overzicht.component.css"],
})
export class ProjectOverzichtComponent implements OnInit {
  private _fetchProjects$: Observable<Project[]> = this._projectDataService
    .projects$;
  public errorMessage: string = '';
  
  constructor(
    private _projectDataService: ProjectDataService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._fetchProjects$ = this._projectDataService.allProjects$.pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
  }

  get projects$(): Observable<Project[]> {
      return this._fetchProjects$;
  }
  
  deleteProject(project: Project) {
    var txt;
    if (confirm("Zeker dat u " + project.naam + " wilt verwijderen?")) {
      this._projectDataService.deleteProject(project);
    } 
    document.getElementById("demo").innerHTML = txt;
    
  }
  editProject(project: Project) {
    this._router.navigate(["dashboard/project/", project.projectID]);
  }
  //addProduct(project: Project) {}
  
}
