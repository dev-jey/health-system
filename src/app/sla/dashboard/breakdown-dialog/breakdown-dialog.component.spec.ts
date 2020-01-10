import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakdownDialogComponent } from './breakdown-dialog.component';

describe('BreakdownDialogComponent', () => {
  let component: BreakdownDialogComponent;
  let fixture: ComponentFixture<BreakdownDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakdownDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakdownDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
