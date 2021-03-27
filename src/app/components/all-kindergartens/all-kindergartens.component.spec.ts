import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllKindergartensComponent } from './all-kindergartens.component';

describe('AllKindergartensComponent', () => {
  let component: AllKindergartensComponent;
  let fixture: ComponentFixture<AllKindergartensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllKindergartensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllKindergartensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
