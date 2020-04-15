import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component'

import { ProjectComponent } from './Project/project/project.component';
import { ProjectListComponent } from './Project/project-list/project-list.component';
import { ProjectModule } from './Project/project.module';
import { ProjectProductComponent } from './Project/project-product/project-product.component';
import { AddProjectComponent } from './Project/add-project/add-project.component';
import { UserModule } from './user/user.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';




@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HomepageComponent,
    FooterComponent,
    ContactComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ProjectModule,
    UserModule,
    AppRoutingModule
  ],
  exports: [ProjectListComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
