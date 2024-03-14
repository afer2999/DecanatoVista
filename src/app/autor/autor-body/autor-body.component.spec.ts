import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorBodyComponent } from './autor-body.component';

describe('AutorBodyComponent', () => {
  let component: AutorBodyComponent;
  let fixture: ComponentFixture<AutorBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
