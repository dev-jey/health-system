import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDependentComponent } from './select-dependent.component';

describe('SelectDependentComponent', () => {
  let component: SelectDependentComponent;
  let fixture: ComponentFixture<SelectDependentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDependentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDependentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
