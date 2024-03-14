import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioPublicacionComponent } from './inicio-publicacion.component';

describe('InicioPublicacionComponent', () => {
  let component: InicioPublicacionComponent;
  let fixture: ComponentFixture<InicioPublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioPublicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
