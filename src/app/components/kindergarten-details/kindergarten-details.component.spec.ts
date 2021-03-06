import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindergartenDetailsComponent } from './kindergarten-details.component';

describe('KindergartenDetailsComponent', () => {
  let component: KindergartenDetailsComponent;
  let fixture: ComponentFixture<KindergartenDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KindergartenDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KindergartenDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
