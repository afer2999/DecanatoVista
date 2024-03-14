import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosnoRegionalesComponent } from './articulosno-regionales.component';

describe('ArticulosnoRegionalesComponent', () => {
  let component: ArticulosnoRegionalesComponent;
  let fixture: ComponentFixture<ArticulosnoRegionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosnoRegionalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosnoRegionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
