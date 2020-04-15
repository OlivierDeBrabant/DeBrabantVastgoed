import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Project } from '../project.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../product.model';
import { Observable } from 'rxjs';
import { ProjectDataService } from '../project-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  public project: FormGroup;
  private _fetchProjects$: Observable<Project[]> 
    = this._projectDataService.projects$;

  constructor(private _projectDataService: ProjectDataService, private _router: Router) { }
  @Output() public newProject = new EventEmitter<Project>();
  
  ngOnInit() {
    this.project = new FormGroup({
      naam: new FormControl('', [Validators.required, Validators.minLength(5)]),
      beschrijving: new FormControl(''),
      adres: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
  }
  onSubmit(){
    const p = new Project(this.project.value.naam, this.project.value.beschrijving, this.project.value.adres)
    this.newProject.emit(p);
    this._projectDataService.addNewProject(p);
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
