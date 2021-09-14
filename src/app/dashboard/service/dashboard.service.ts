import { BehaviorSubject, Observable } from 'rxjs';
import { CashFlowStore } from './../../cash-flow/service/cash-flow.store';
import { CategorySubcategoryStore } from './../../category/service/category-subcategory.store';
import { Injectable } from '@angular/core';
import { ICashFlowModel, ICategoryWithCashFlowModel } from '../model/dashboar-view.model';

@Injectable()
export class DashboardService {

  private categoryWithCashFlowSubject = new BehaviorSubject<Array<Partial<ICategoryWithCashFlowModel>> | []>([]);
  categoryWithCashFlowObservable$: Observable<Array<Partial<ICategoryWithCashFlowModel>> | []>;


  private selectedCategorySubject=new BehaviorSubject([]);
  selectedCategoryObservable$:any;


  constructor(private csStore: CategorySubcategoryStore, private cfStore: CashFlowStore) {
    this.categoryWithCashFlowObservable$ = this.categoryWithCashFlowSubject.asObservable();
    this.selectedCategoryObservable$=this.selectedCategorySubject.asObservable();
    this.getAllCategory();

  }

  getAllCategory() {

    this.csStore.categoryObs$.subscribe((data) => {
      this.categoryWithCashFlowSubject.next([]);
      if (data?.length) {
        let catWithAmountObj: Array<Partial<ICategoryWithCashFlowModel>> = [];

        data.forEach(element => {
          catWithAmountObj.push({
            categoryId: element.id,
            categoryName: element.categoryName,
            cashFlow: [],
            totalAmount: 0
          });
        });
        this.getAllCashFlow();
        this.categoryWithCashFlowSubject.next(catWithAmountObj);
      }
    });
  }
  getAllCashFlow() {
    this.cfStore.cashFlow$.subscribe((cashFlowData) => {
      if (cashFlowData?.length) {
        // let casFlow:Array<Partial<ICashFlowModel>>=[];
        const categoryObj = this.categoryWithCashFlowSubject.getValue();
        if (categoryObj.length) {
          categoryObj.forEach(categoryElement => {
            categoryElement.cashFlow = [];
            categoryElement.totalAmount = 0;
            cashFlowData.forEach(cashFlowElement => {
              if (categoryElement.categoryId == cashFlowElement.cateoryId) {
                categoryElement.totalAmount = (categoryElement.totalAmount as number) + cashFlowElement.amount;
                categoryElement.cashFlow?.push({
                  cashFlowId: cashFlowElement.id,
                  date: cashFlowElement.operatedOnInstance,
                  amount: cashFlowElement.amount,
                  comment: cashFlowElement.description,
                  type: cashFlowElement.subCategoryName,
                  for: cashFlowElement.operatedAgainst
                })
              }
            });
          });
        }
      }
    })
  }


  selectedCategory(category:any){
    this.selectedCategorySubject.next(category);
  }


}
