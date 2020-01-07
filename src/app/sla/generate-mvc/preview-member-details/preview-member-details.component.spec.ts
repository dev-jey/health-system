import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewMemberDetailsComponent } from './preview-member-details.component';

describe('PreviewMemberDetailsComponent', () => {
  let component: PreviewMemberDetailsComponent;
  let fixture: ComponentFixture<PreviewMemberDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewMemberDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewMemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
