import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoProduccionComponent } from './ingreso-produccion.component';

describe('IngresoProduccionComponent', () => {
  let component: IngresoProduccionComponent;
  let fixture: ComponentFixture<IngresoProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoProduccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
