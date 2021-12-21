import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMapComponent } from './input-map.component';

describe('InputMapComponent', () => {
  let component: InputMapComponent;
  let fixture: ComponentFixture<InputMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
