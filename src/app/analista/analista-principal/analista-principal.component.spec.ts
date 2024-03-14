import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalistaPrincipalComponent } from './analista-principal.component';

describe('AnalistaPrincipalComponent', () => {
  let component: AnalistaPrincipalComponent;
  let fixture: ComponentFixture<AnalistaPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalistaPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalistaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
