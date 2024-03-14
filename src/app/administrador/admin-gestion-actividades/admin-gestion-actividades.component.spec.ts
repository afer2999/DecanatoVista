import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGestionActividadesComponent } from './admin-gestion-actividades.component';

describe('AdminGestionActividadesComponent', () => {
  let component: AdminGestionActividadesComponent;
  let fixture: ComponentFixture<AdminGestionActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGestionActividadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGestionActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
