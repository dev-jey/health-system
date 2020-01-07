import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSessionTimeoutComponent } from './error-session-timeout.component';

describe('ErrorSessionTimeoutComponent', () => {
  let component: ErrorSessionTimeoutComponent;
  let fixture: ComponentFixture<ErrorSessionTimeoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorSessionTimeoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorSessionTimeoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
