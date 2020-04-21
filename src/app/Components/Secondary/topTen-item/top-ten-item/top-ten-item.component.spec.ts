import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTenItemComponent } from './top-ten-item.component';

describe('TopTenItemComponent', () => {
  let component: TopTenItemComponent;
  let fixture: ComponentFixture<TopTenItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopTenItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopTenItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
