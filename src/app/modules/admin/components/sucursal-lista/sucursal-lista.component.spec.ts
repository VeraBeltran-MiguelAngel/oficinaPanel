import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalListaComponent } from './sucursal-lista.component';

describe('SucursalListaComponent', () => {
  let component: SucursalListaComponent;
  let fixture: ComponentFixture<SucursalListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SucursalListaComponent]
    });
    fixture = TestBed.createComponent(SucursalListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
