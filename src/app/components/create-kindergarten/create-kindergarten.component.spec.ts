import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKindergartenComponent } from './create-kindergarten.component';

describe('CreateKindergartenComponent', () => {
  let component: CreateKindergartenComponent;
  let fixture: ComponentFixture<CreateKindergartenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateKindergartenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateKindergartenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
