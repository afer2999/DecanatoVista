import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoPublicacionesComponent } from './ingreso-publicaciones.component';

describe('IngresoPublicacionesComponent', () => {
  let component: IngresoPublicacionesComponent;
  let fixture: ComponentFixture<IngresoPublicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoPublicacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
