import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimPreauthListLayoutComponent } from './claim-preauth-list-layout.component';

describe('ClaimPreauthListLayoutComponent', () => {
  let component: ClaimPreauthListLayoutComponent;
  let fixture: ComponentFixture<ClaimPreauthListLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimPreauthListLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimPreauthListLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
