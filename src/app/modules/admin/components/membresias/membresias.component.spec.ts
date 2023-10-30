import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembresiasComponent } from './membresias.component';

describe('MembresiasComponent', () => {
  let component: MembresiasComponent;
  let fixture: ComponentFixture<MembresiasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembresiasComponent]
    });
    fixture = TestBed.createComponent(MembresiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
