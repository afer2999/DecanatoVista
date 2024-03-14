import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalistaSliderComponent } from './analista-slider.component';

describe('AnalistaSliderComponent', () => {
  let component: AnalistaSliderComponent;
  let fixture: ComponentFixture<AnalistaSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalistaSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalistaSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
