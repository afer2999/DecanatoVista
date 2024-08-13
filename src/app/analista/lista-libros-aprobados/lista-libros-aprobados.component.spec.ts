import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLibrosAprobadosComponent } from './lista-libros-aprobados.component';

describe('ListaLibrosAprobadosComponent', () => {
  let component: ListaLibrosAprobadosComponent;
  let fixture: ComponentFixture<ListaLibrosAprobadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaLibrosAprobadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaLibrosAprobadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
