import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorContentComponent } from './autor-content.component';

describe('AutorContentComponent', () => {
  let component: AutorContentComponent;
  let fixture: ComponentFixture<AutorContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
