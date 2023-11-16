import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosVistaComponent } from './horarios-vista.component';

describe('HorariosVistaComponent', () => {
  let component: HorariosVistaComponent;
  let fixture: ComponentFixture<HorariosVistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorariosVistaComponent]
    });
    fixture = TestBed.createComponent(HorariosVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
