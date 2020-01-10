import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhifRebateComponent } from './nhif-rebate.component';

describe('NhifRebateComponent', () => {
  let component: NhifRebateComponent;
  let fixture: ComponentFixture<NhifRebateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhifRebateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhifRebateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
