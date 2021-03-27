import { TestBed } from '@angular/core/testing';

import { TodosCountService } from './todos-count.service';

describe('TodosCountService', () => {
  let service: TodosCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodosCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
