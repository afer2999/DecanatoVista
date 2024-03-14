import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorGestionSolicitudesComponent } from './autor-gestion-solicitudes.component';

describe('AutorGestionSolicitudesComponent', () => {
  let component: AutorGestionSolicitudesComponent;
  let fixture: ComponentFixture<AutorGestionSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorGestionSolicitudesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorGestionSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
