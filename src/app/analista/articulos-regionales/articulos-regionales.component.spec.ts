import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosRegionalesComponent } from './articulos-regionales.component';

describe('ArticulosRegionalesComponent', () => {
  let component: ArticulosRegionalesComponent;
  let fixture: ComponentFixture<ArticulosRegionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosRegionalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosRegionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
