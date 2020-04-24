import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../project.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectDataService } from '../project-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  @Input() public projecte: Project;
  public opgeslaan: boolean = false;
  public project: FormGroup;
  private _fetchProjects$: Observable<Project[]> 
    = this._projectDataService.projects$;

  constructor(private _projectDataService: ProjectDataService, private _router: Router) { }
  //@Output() public newProject = new EventEmitter<Project>();
  
  ngOnInit() {
    this.project = new FormGroup({
      naam: new FormControl(this.projecte.naam, [Validators.required, Validators.minLength(5)]),
      beschrijving: new FormControl(this.projecte.beschrijving, [Validators.required]),
      adres: new FormControl(this.projecte.adres, [Validators.required, Validators.minLength(5)])
    })
  }
  onSubmit(){
    const p = new Project(this.project.value.naam, this.project.value.beschrijving, this.project.value.adres);
    p._projectID = this.projecte.projectID;
    //this.newProject.emit(p);
    var id = this.projecte.projectID.toString();
    this._projectDataService.editProject(id , p);
    this.opgeslaan = true;
    this._router.navigate(['dashboard']);
  }


  getErrorMessage(errors: any): string {
    if (errors.required) {
      return 'Noodzakelijk';
    } else if (errors.minlength) {
      return `Minimum ${errors.minlength.requiredLength} 
        karakters gevraagd (momenteel ${errors.minlength.actualLength} karakters)`;
    }
  }

}
