import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForceLayoutChartComponent } from './force-layout-chart.component';

describe('ForceLayoutChartComponent', () => {
  let component: ForceLayoutChartComponent;
  let fixture: ComponentFixture<ForceLayoutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForceLayoutChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ForceLayoutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
