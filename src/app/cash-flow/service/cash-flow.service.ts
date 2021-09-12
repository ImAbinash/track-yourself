import { AuthStoreService } from './../../auth/service/auth.store';
import { CashFlowStore } from './cash-flow.store';
import { map, tap } from 'rxjs/operators';
import { ICategoryWithSubCategoryModel, ISubCategory } from './../../category/model/category-subcategory.model';
import { Observable } from 'rxjs';
import { CategorySubcategoryStore } from './../../category/service/category-subcategory.store';
import { Injectable } from '@angular/core';
import { cashFlowInitialization, ICashFlow } from '../model/cash-flow.model';

@Injectable()
export class CashFlowService {

  category$ !: Observable<Partial<ICategoryWithSubCategoryModel>[] | undefined>;
  subCategory$ !: Observable<Partial<ISubCategory>[] | undefined>;

  constructor(private authStore: AuthStoreService, private catStore: CategorySubcategoryStore, private cfStore: CashFlowStore) {
    //this.getAllCategoryAndSubCategory();
    console.log("Category observer");
    console.log(this.catStore.categoryObs$);
  }

  getAllCategoryAndSubCategory(): Observable<Partial<ICategoryWithSubCategoryModel>[] | undefined> {
    const allCategory$ = this.catStore.categoryObs$;
    this.category$ = allCategory$.pipe(
      map(data => data?.filter(d => d.isActive))
    );
    return this.category$;
  }
  getAllSubCategory(categoryID: string): Observable<Partial<ISubCategory>[] | undefined> {
    this.subCategory$ = this.category$.pipe(
      map(data => {
        const catData = data?.filter((d) => d.id == categoryID && d.subCategory?.length != 0);
        let subCatDat: Array<ISubCategory> | undefined = [];
        catData?.forEach(element => {
          subCatDat = element.subCategory?.filter(scData => scData.isActive)
        });
        return subCatDat;
      })
    );
    return this.subCategory$;
  }


  saveCashFlow(cashFlow: Partial<ICashFlow>) {

    let categoryName = undefined;
    let subCategoryName = undefined;

    this.category$.pipe(
      //map(data=>data),
      map((data) => {
        const categoryObj = data?.filter(category => category.id == cashFlow.cateoryId);
        categoryObj?.forEach(element => {
          categoryName = element.categoryName;
        })
      })
    ).subscribe();
    this.subCategory$.pipe(
      //map(data=>data),
      map((data) => {
        const subCategoryObj = data?.filter(subCategory => subCategory.id == cashFlow.subCategoryId);
        subCategoryObj?.forEach(element => {
          subCategoryName = element.subCategoryName;
        })
      })
    ).subscribe();

    this.authStore.user$.subscribe((data) => {
      cashFlow.userId = data?.id;
    });

    const cashFlowObj: Partial<ICashFlow> = cashFlowInitialization({ categoryName, subCategoryName, ...cashFlow });
    this.cfStore.createcashFlow(cashFlowObj);
  }


  saveAllTag(userId:string,tag:Array<string>) {
   this.authStore.saveTag(userId,tag);
  }




}
