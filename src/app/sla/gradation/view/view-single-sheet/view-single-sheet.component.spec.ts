import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleSheetComponent } from './view-single-sheet.component';

describe('ViewSingleSheetComponent', () => {
  let component: ViewSingleSheetComponent;
  let fixture: ComponentFixture<ViewSingleSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSingleSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
