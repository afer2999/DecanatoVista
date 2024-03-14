import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalistaReporteComponent } from './analista-reporte.component';

describe('AnalistaReporteComponent', () => {
  let component: AnalistaReporteComponent;
  let fixture: ComponentFixture<AnalistaReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalistaReporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalistaReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
