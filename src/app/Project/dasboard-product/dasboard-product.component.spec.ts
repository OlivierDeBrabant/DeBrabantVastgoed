import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardProductComponent } from './dasboard-product.component';

describe('DasboardProductComponent', () => {
  let component: DasboardProductComponent;
  let fixture: ComponentFixture<DasboardProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DasboardProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DasboardProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
