import { DateHelper } from './../../shared/utils/date.util';
import { filter, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CashFlowStore } from './../../cash-flow/service/cash-flow.store';
import { CategorySubcategoryStore } from './../../category/service/category-subcategory.store';
import { Injectable } from '@angular/core';
import { ICashFlowModel, ICategoryWithCashFlowModel } from '../model/dashboar-view.model';


@Injectable()
export class DashboardService {

  private categoryWithCashFlowSubject = new BehaviorSubject<Array<Partial<ICategoryWithCashFlowModel>> | []>([]);
  private filteredcategoryWithCashFlowSubject = new BehaviorSubject<Array<Partial<ICategoryWithCashFlowModel>> | []>([]);
  categoryWithCashFlowObservable$: Observable<Array<Partial<ICategoryWithCashFlowModel>> | []>;
  filterCategoryWithCashFlowObs$: Observable<Array<Partial<ICategoryWithCashFlowModel>> | []>;

  private selectedCategorySubject = new BehaviorSubject([]);
  selectedCategoryObservable$: any;
  catWithAmountObj: Array<Partial<ICategoryWithCashFlowModel>> = [];


  constructor(private csStore: CategorySubcategoryStore, private cfStore: CashFlowStore) {
    this.categoryWithCashFlowObservable$ = this.categoryWithCashFlowSubject.asObservable();
    this.filterCategoryWithCashFlowObs$ = this.filteredcategoryWithCashFlowSubject.asObservable();

    this.selectedCategoryObservable$ = this.selectedCategorySubject.asObservable();
    this.getAllCategory();

  }

  getAllCategory() {

    this.csStore.categoryObs$.subscribe((data) => {
      this.categoryWithCashFlowSubject.next([]);
      if (data?.length) {


        data.forEach(element => {
          this.catWithAmountObj.push({
            categoryId: element.id,
            categoryName: element.categoryName,
            cashFlow: [],
            totalAmount: 0
          });
        });
        this.getAllCashFlow();
        this.categoryWithCashFlowSubject.next(this.catWithAmountObj.slice());
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


  selectedCategory(category: any) {
    this.selectedCategorySubject.next(category);
  }

  filteredCashFlow(filterObj: { startDate: '', endDate: '' }) {
    console.clear();
    if (filterObj.startDate != '' && (filterObj.endDate == '' || filterObj.endDate == null || filterObj.endDate == undefined)) {
      filterObj.endDate = filterObj.startDate;
    }
    let stD = new Date(filterObj.startDate);
    let enD = new Date(filterObj.endDate);
    let startDate = new Date(stD.getFullYear(), stD.getMonth(), stD.getDate(), 0, 0, 0, 0).getTime();
    let endDate = new Date(enD.getFullYear(), enD.getMonth(), enD.getDate(), 23, 59, 59, 999).getTime();


    this.catWithAmountObj.forEach((data => {
      //console.log("catWithAmountObj: ",data);
      data.cashFlow?.forEach(element => {
        console.log(element);
        let convertedDate = (new DateHelper().convertUTCToLocalDateAndFormat(element.date));
        console.log("datae: " + element.date + " :::: converted date: " + convertedDate);
        console.log("Time in milisecond: " + new DateHelper().getTimeInMilisecond(convertedDate));
      });
    }));


    if (
      (!(isNaN(startDate)) && !(isNaN(endDate))) &&
      (filterObj.startDate !== '' && filterObj.endDate !== '') &&
      (startDate > 0 && endDate > 0)) {

      let catWithAmountObjString = JSON.stringify(this.catWithAmountObj);
      let filterdVal = JSON.parse(catWithAmountObjString);

      filterdVal = filterdVal.filter((element: any) => {
        element.totalAmount = 0;

        return element.cashFlow = element.cashFlow.filter((cf: any) => {

          let localDate = new DateHelper().convertUTCToLocalDateAndFormat(cf.date)
          let selectedDateTime = new DateHelper().getTimeInMilisecond(localDate);

          if (selectedDateTime >= startDate && selectedDateTime <= endDate) {
            element.totalAmount += cf.amount
            return true;

          }
          return false;
        });
      }
      );

      console.log("filterdVal: ", filterdVal);

      this.filteredcategoryWithCashFlowSubject.next(filterdVal);
    } else {
      this.filteredcategoryWithCashFlowSubject.next([]);
    }

  }

}
