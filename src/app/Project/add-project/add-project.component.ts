import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Project } from '../project.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Product } from '../product.model';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  constructor() { }
  @Output() public newProject = new EventEmitter<Project>();
  
  ngOnInit() {
    /*this.project = new FormGroup({
      name: new FormControl('risotto')
    })*/
  }
  addProject(projectName: HTMLInputElement, beschrijving: HTMLInputElement, adres: HTMLInputElement): boolean {
    const project = new Project(projectName.value, beschrijving.value, adres.value, [])
    this.newProject.emit(project);
    console.log(project.naam + '\n' + project.beschrijving + '\n' + project.adres);
    return false;
  }
}
