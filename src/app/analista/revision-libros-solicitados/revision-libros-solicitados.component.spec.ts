import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionLibrosSolicitadosComponent } from './revision-libros-solicitados.component';

describe('RevisionLibrosSolicitadosComponent', () => {
  let component: RevisionLibrosSolicitadosComponent;
  let fixture: ComponentFixture<RevisionLibrosSolicitadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionLibrosSolicitadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionLibrosSolicitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
