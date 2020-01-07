import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateMvcComponent } from './generate-mvc.component';

describe('GenerateMvcComponent', () => {
  let component: GenerateMvcComponent;
  let fixture: ComponentFixture<GenerateMvcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateMvcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateMvcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
