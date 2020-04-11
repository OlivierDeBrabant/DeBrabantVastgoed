import { Component, OnInit, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Project } from '../project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() public project : Project;
   
  constructor() {}

  ngOnInit(): void {
  }
}
