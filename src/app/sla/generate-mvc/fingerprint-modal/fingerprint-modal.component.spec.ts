import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FingerprintModalComponent } from './fingerprint-modal.component';

describe('FingerprintModalComponent', () => {
  let component: FingerprintModalComponent;
  let fixture: ComponentFixture<FingerprintModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FingerprintModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FingerprintModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
