import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalistaHeaderComponent } from './analista-header.component';

describe('AnalistaHeaderComponent', () => {
  let component: AnalistaHeaderComponent;
  let fixture: ComponentFixture<AnalistaHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalistaHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalistaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
