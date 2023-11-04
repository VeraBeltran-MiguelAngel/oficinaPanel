import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaColaboradoresComponent } from './alta-colaboradores.component';

describe('AltaColaboradoresComponent', () => {
  let component: AltaColaboradoresComponent;
  let fixture: ComponentFixture<AltaColaboradoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaColaboradoresComponent]
    });
    fixture = TestBed.createComponent(AltaColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
