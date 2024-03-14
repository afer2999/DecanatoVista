import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionArticulosSolicitadosComponent } from './revision-articulos-solicitados.component';

describe('RevisionArticulosSolicitadosComponent', () => {
  let component: RevisionArticulosSolicitadosComponent;
  let fixture: ComponentFixture<RevisionArticulosSolicitadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionArticulosSolicitadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionArticulosSolicitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
