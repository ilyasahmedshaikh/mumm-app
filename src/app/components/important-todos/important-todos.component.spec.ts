import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantTodosComponent } from './important-todos.component';

describe('ImportantTodosComponent', () => {
  let component: ImportantTodosComponent;
  let fixture: ComponentFixture<ImportantTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportantTodosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
