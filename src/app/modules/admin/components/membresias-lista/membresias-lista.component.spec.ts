import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembresiasListaComponent } from './membresias-lista.component';

describe('MembresiasListaComponent', () => {
  let component: MembresiasListaComponent;
  let fixture: ComponentFixture<MembresiasListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembresiasListaComponent]
    });
    fixture = TestBed.createComponent(MembresiasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
