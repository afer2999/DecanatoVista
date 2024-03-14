import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalistaContentComponent } from './analista-content.component';

describe('AnalistaContentComponent', () => {
  let component: AnalistaContentComponent;
  let fixture: ComponentFixture<AnalistaContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalistaContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalistaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
