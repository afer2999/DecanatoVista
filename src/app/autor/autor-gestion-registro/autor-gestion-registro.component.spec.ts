import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorGestionRegistroComponent } from './autor-gestion-registro.component';

describe('AutorGestionRegistroComponent', () => {
  let component: AutorGestionRegistroComponent;
  let fixture: ComponentFixture<AutorGestionRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorGestionRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorGestionRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
