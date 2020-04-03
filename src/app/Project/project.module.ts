import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component'
import { ProductComponent } from './product/product.component'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ProjectComponent, ProductComponent],
  imports: [
    CommonModule, HttpClientModule
  ]
})
export class ProjectModule { }
