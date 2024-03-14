import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosCongresoComponent } from './articulos-congreso.component';

describe('ArticulosCongresoComponent', () => {
  let component: ArticulosCongresoComponent;
  let fixture: ComponentFixture<ArticulosCongresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosCongresoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosCongresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
