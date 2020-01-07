import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMvcGenerationComponent } from './confirm-mvc-generation.component';

describe('ConfirmMvcGenerationComponent', () => {
  let component: ConfirmMvcGenerationComponent;
  let fixture: ComponentFixture<ConfirmMvcGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmMvcGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmMvcGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
