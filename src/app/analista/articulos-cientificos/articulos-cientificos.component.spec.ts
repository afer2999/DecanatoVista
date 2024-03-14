import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosCientificosComponent } from './articulos-cientificos.component';

describe('ArticulosCientificosComponent', () => {
  let component: ArticulosCientificosComponent;
  let fixture: ComponentFixture<ArticulosCientificosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosCientificosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosCientificosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
