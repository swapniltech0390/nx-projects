import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScatterShapeChartComponent } from './scatter-shape-chart.component';

describe('ScatterShapeChartComponent', () => {
  let component: ScatterShapeChartComponent;
  let fixture: ComponentFixture<ScatterShapeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScatterShapeChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScatterShapeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
