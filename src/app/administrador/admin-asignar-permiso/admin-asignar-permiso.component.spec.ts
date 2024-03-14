import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAsignarPermisoComponent } from './admin-asignar-permiso.component';

describe('AdminAsignarPermisoComponent', () => {
  let component: AdminAsignarPermisoComponent;
  let fixture: ComponentFixture<AdminAsignarPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAsignarPermisoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAsignarPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
