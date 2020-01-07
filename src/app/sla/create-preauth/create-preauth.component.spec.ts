import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePreauthComponent } from './create-preauth.component';

describe('CreatePreauthComponent', () => {
  let component: CreatePreauthComponent;
  let fixture: ComponentFixture<CreatePreauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePreauthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePreauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
