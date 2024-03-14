import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGestionRolesComponent } from './admin-gestion-roles.component';

describe('AdminGestionRolesComponent', () => {
  let component: AdminGestionRolesComponent;
  let fixture: ComponentFixture<AdminGestionRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGestionRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGestionRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
