import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorHeaderComponent } from './autor-header.component';

describe('AutorHeaderComponent', () => {
  let component: AutorHeaderComponent;
  let fixture: ComponentFixture<AutorHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
