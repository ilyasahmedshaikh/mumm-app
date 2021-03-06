import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCraftmanComponent } from './create-craftman.component';

describe('CreateCraftmanComponent', () => {
  let component: CreateCraftmanComponent;
  let fixture: ComponentFixture<CreateCraftmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCraftmanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCraftmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
