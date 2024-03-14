import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionCongresosSolicitadosComponent } from './revision-congresos-solicitados.component';

describe('RevisionCongresosSolicitadosComponent', () => {
  let component: RevisionCongresosSolicitadosComponent;
  let fixture: ComponentFixture<RevisionCongresosSolicitadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionCongresosSolicitadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionCongresosSolicitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
