import { Utility } from 'src/app/shared/utils/other.util';
import { CategorySubcategoryStore } from './category-subcategory.store';
import {  categoryInitialization, ICategoryWithSubCategoryModel } from './../model/category-subcategory.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CategorySubcategoryService {

  constructor(private catSubCatStore: CategorySubcategoryStore) { }


  cteateCategory(category:Partial<ICategoryWithSubCategoryModel>){
    const categoryObj:Partial<ICategoryWithSubCategoryModel>  = categoryInitialization({categoryName:category.categoryName});
    this.catSubCatStore.saveCategory(categoryObj);
  }
  

}
