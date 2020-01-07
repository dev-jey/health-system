import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyFingerprintComponent } from './verify-fingerprint.component';

describe('VerifyFingerprintComponent', () => {
  let component: VerifyFingerprintComponent;
  let fixture: ComponentFixture<VerifyFingerprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyFingerprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyFingerprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
