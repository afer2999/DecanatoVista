import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaDeInvestigacionComponent } from './linea-de-investigacion.component';

describe('LineaDeInvestigacionComponent', () => {
  let component: LineaDeInvestigacionComponent;
  let fixture: ComponentFixture<LineaDeInvestigacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineaDeInvestigacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineaDeInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
