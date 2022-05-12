import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenChartEstimationComponent } from './open-chart-estimation.component';

describe('OpenChartEstimationComponent', () => {
  let component: OpenChartEstimationComponent;
  let fixture: ComponentFixture<OpenChartEstimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenChartEstimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenChartEstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
