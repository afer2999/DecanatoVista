import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGestionEstadosComponent } from './admin-gestion-estados.component';

describe('AdminGestionEstadosComponent', () => {
  let component: AdminGestionEstadosComponent;
  let fixture: ComponentFixture<AdminGestionEstadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGestionEstadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGestionEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
