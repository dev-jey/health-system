import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeRulesComponent } from './scheme-rules.component';

describe('SchemeRulesComponent', () => {
  let component: SchemeRulesComponent;
  let fixture: ComponentFixture<SchemeRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
