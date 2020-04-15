import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomepageComponent } from './homepage/homepage.component';
import { ContactComponent } from './contact/contact.component'

import { ProjectComponent } from './Project/project/project.component';
import { ProjectListComponent } from './Project/project-list/project-list.component';
import { AddProjectComponent } from './Project/add-project/add-project.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CommonModule } from '@angular/common';
import { ProjectProductComponent } from './Project/project-product/project-product.component';
import { AuthGuard } from './user/auth.guard';



const appRoutes: Routes = [
  //{ path: 'dashboard', canActivate: [AuthGuard]},
  { path: '', component: HomepageComponent },
  { path: 'project', component: ProjectComponent},
  { path: 'projecten', component: ProjectListComponent},
  { path: 'dashboard/addProject', canActivate: [AuthGuard], component : AddProjectComponent},
  { path: 'contact', component : ContactComponent},
  { path: 'projecten/projectproduct/:id', component: ProjectProductComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
