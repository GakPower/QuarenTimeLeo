import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputeRecommendationComponent } from './compute-recommendation.component';

describe('ComputeRecommendationComponent', () => {
  let component: ComputeRecommendationComponent;
  let fixture: ComponentFixture<ComputeRecommendationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputeRecommendationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputeRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
