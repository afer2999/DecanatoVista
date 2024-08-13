import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorMigrarComponent } from './autor-migrar.component';

describe('AutorMigrarComponent', () => {
  let component: AutorMigrarComponent;
  let fixture: ComponentFixture<AutorMigrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorMigrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorMigrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
