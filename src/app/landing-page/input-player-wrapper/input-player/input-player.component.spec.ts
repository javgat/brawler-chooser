import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPlayerComponent } from './input-player.component';

describe('InputPlayerComponent', () => {
  let component: InputPlayerComponent;
  let fixture: ComponentFixture<InputPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
