import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalistaFooterComponent } from './analista-footer.component';

describe('AnalistaFooterComponent', () => {
  let component: AnalistaFooterComponent;
  let fixture: ComponentFixture<AnalistaFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalistaFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalistaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
