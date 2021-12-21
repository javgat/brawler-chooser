import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPlayerWrapperComponent } from './input-player-wrapper.component';

describe('InputPlayerWrapperComponent', () => {
  let component: InputPlayerWrapperComponent;
  let fixture: ComponentFixture<InputPlayerWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputPlayerWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPlayerWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
