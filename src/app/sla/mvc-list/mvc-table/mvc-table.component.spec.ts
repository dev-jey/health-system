import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvcTableComponent } from './mvc-table.component';

describe('MvcTableComponent', () => {
  let component: MvcTableComponent;
  let fixture: ComponentFixture<MvcTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvcTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvcTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
