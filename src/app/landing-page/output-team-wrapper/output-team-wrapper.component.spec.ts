import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputTeamWrapperComponent } from './output-team-wrapper.component';

describe('OutputTeamWrapperComponent', () => {
  let component: OutputTeamWrapperComponent;
  let fixture: ComponentFixture<OutputTeamWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputTeamWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputTeamWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
