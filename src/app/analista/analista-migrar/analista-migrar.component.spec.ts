import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalistaMigrarComponent } from './analista-migrar.component';

describe('AnalistaMigrarComponent', () => {
  let component: AnalistaMigrarComponent;
  let fixture: ComponentFixture<AnalistaMigrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalistaMigrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalistaMigrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
