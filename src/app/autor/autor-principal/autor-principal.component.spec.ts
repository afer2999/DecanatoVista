import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorPrincipalComponent } from './autor-principal.component';

describe('AutorPrincipalComponent', () => {
  let component: AutorPrincipalComponent;
  let fixture: ComponentFixture<AutorPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
