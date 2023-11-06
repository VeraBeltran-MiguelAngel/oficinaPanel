import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalEditarComponent } from './sucursal-editar.component';

describe('SucursalEditarComponent', () => {
  let component: SucursalEditarComponent;
  let fixture: ComponentFixture<SucursalEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SucursalEditarComponent]
    });
    fixture = TestBed.createComponent(SucursalEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
