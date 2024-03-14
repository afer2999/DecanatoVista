import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasesDeDatosComponent } from './bases-de-datos.component';

describe('BasesDeDatosComponent', () => {
  let component: BasesDeDatosComponent;
  let fixture: ComponentFixture<BasesDeDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasesDeDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasesDeDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
