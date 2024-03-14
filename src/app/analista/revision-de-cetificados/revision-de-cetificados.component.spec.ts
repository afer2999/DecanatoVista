import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionDeCetificadosComponent } from './revision-de-cetificados.component';

describe('RevisionDeCetificadosComponent', () => {
  let component: RevisionDeCetificadosComponent;
  let fixture: ComponentFixture<RevisionDeCetificadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionDeCetificadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionDeCetificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
