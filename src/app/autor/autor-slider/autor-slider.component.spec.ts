import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorSliderComponent } from './autor-slider.component';

describe('AutorSliderComponent', () => {
  let component: AutorSliderComponent;
  let fixture: ComponentFixture<AutorSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
