import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimPreauthTableComponent } from './claim-preauth-table.component';

describe('ClaimPreauthTableComponent', () => {
  let component: ClaimPreauthTableComponent;
  let fixture: ComponentFixture<ClaimPreauthTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimPreauthTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimPreauthTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
