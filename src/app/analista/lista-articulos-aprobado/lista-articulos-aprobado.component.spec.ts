import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaArticulosAprobadoComponent } from './lista-articulos-aprobado.component';

describe('ListaArticulosAprobadoComponent', () => {
  let component: ListaArticulosAprobadoComponent;
  let fixture: ComponentFixture<ListaArticulosAprobadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaArticulosAprobadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaArticulosAprobadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
