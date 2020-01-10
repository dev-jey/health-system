import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphsLayoutComponent } from './graphs-layout.component';

describe('GraphsLayoutComponent', () => {
  let component: GraphsLayoutComponent;
  let fixture: ComponentFixture<GraphsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphsLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
