import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimPreauthLayoutComponent } from './claim-preauth-layout.component';

describe('ClaimPreauthLayoutComponent', () => {
  let component: ClaimPreauthLayoutComponent;
  let fixture: ComponentFixture<ClaimPreauthLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimPreauthLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimPreauthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
