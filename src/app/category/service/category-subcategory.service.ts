import { ISubCategoryDataModel } from './../model/subCategory-data.model';
import { AuthStoreService } from './../../auth/service/auth.store';
import { Utility } from 'src/app/shared/utils/other.util';
import { CategorySubcategoryStore } from './category-subcategory.store';
import { categoryInitialization, ICategoryWithSubCategoryModel, ISubCategory, subCategoryInitialization } from './../model/category-subcategory.model';
import { Injectable } from '@angular/core';
import { prepareTable } from '../model/subCategory-data.model';

@Injectable()
export class CategorySubcategoryService {

  constructor(private authStore: AuthStoreService, private catSubCatStore: CategorySubcategoryStore) { }


  cteateCategory(category: Partial<ICategoryWithSubCategoryModel>) {
    this.authStore.user$.subscribe((data) => {
      category.userId = data?.id;
    });
    const categoryObj: Partial<ICategoryWithSubCategoryModel> = categoryInitialization({ ...category });
    this.catSubCatStore.saveCategory(categoryObj);
  }
  createSubCategory(category: Partial<ICategoryWithSubCategoryModel>, subCategory: ISubCategory) {
    const subCategoryModelObj = subCategoryInitialization(subCategory);
    this.catSubCatStore.savesubCategory({ ...category }, { ...subCategoryModelObj });
  }
  createDataSource(subCategory: Array<ISubCategory>):Array<ISubCategoryDataModel> {
    return prepareTable(subCategory);
  }
}
