import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOverzichtComponent } from './project-overzicht.component';

describe('ProjectOverzichtComponent', () => {
  let component: ProjectOverzichtComponent;
  let fixture: ComponentFixture<ProjectOverzichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectOverzichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOverzichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
