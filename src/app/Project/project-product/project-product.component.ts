import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../project.model'

@Component({
  selector: 'app-project-product',
  templateUrl: './project-product.component.html',
  styleUrls: ['./project-product.component.css']
})
export class ProjectProductComponent implements OnInit {
  @Input() public project : Project;

  get products(){
    return this.project.producten;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
