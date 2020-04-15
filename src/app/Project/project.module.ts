import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component'
import { ProductComponent } from './product/product.component'
import { HttpClientModule } from '@angular/common/http';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectProductComponent } from './project-product/project-product.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProjectComponent } from './add-project/add-project.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectOverzichtComponent } from './project-overzicht/project-overzicht.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { AuthGuard } from '../user/auth.guard';


const appRoutes: Routes = [
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent},
  { path: 'editProject', canActivate: [AuthGuard], component: EditProjectComponent}
];

@NgModule({
  declarations: [ProjectComponent, ProductComponent, ProjectListComponent, ProjectProductComponent, AddProjectComponent, DashboardComponent, ProjectOverzichtComponent, EditProjectComponent],
  imports: [CommonModule, HttpClientModule, RouterModule.forRoot(appRoutes), ReactiveFormsModule],
  exports: [ProjectListComponent]
})
export class ProjectModule {}
