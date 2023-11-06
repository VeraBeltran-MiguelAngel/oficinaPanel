import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalAltaComponent } from './sucursal-alta.component';

describe('SucursalAltaComponent', () => {
  let component: SucursalAltaComponent;
  let fixture: ComponentFixture<SucursalAltaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SucursalAltaComponent]
    });
    fixture = TestBed.createComponent(SucursalAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
