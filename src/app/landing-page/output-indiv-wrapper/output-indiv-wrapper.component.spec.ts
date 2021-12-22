import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputIndivWrapperComponent } from './output-indiv-wrapper.component';

describe('OutputIndivWrapperComponent', () => {
  let component: OutputIndivWrapperComponent;
  let fixture: ComponentFixture<OutputIndivWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputIndivWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputIndivWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
