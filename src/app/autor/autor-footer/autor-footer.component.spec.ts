import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorFooterComponent } from './autor-footer.component';

describe('AutorFooterComponent', () => {
  let component: AutorFooterComponent;
  let fixture: ComponentFixture<AutorFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
