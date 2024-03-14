import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCongresosComponent } from './gestion-congresos.component';

describe('GestionCongresosComponent', () => {
  let component: GestionCongresosComponent;
  let fixture: ComponentFixture<GestionCongresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCongresosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCongresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
