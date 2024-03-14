import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCertificadoComponent } from './tipo-certificado.component';

describe('TipoCertificadoComponent', () => {
  let component: TipoCertificadoComponent;
  let fixture: ComponentFixture<TipoCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoCertificadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
