import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCongresoAprobadoComponent } from './lista-congreso-aprobado.component';

describe('ListaCongresoAprobadoComponent', () => {
  let component: ListaCongresoAprobadoComponent;
  let fixture: ComponentFixture<ListaCongresoAprobadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCongresoAprobadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCongresoAprobadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
