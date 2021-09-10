import { TestBed } from '@angular/core/testing';

import { CategorySubcategoryService } from './category-subcategory.service';

describe('CategorySubcategoryService', () => {
  let service: CategorySubcategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorySubcategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
