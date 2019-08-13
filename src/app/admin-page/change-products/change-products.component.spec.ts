import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeProductsComponent } from './change-products.component';

describe('ChangeProductsComponent', () => {
  let component: ChangeProductsComponent;
  let fixture: ComponentFixture<ChangeProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
