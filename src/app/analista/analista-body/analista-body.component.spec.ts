import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalistaBodyComponent } from './analista-body.component';

describe('AnalistaBodyComponent', () => {
  let component: AnalistaBodyComponent;
  let fixture: ComponentFixture<AnalistaBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalistaBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalistaBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
