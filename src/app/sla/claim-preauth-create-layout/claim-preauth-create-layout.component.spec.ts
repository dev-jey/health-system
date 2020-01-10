import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimPreauthCreateLayoutComponent } from './claim-preauth-create-layout.component';

describe('ClaimPreauthLayoutComponent', () => {
  let component: ClaimPreauthCreateLayoutComponent;
  let fixture: ComponentFixture<ClaimPreauthCreateLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimPreauthCreateLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimPreauthCreateLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
