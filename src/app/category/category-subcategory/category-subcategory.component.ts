import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { CategorySubcategoryService } from './../service/category-subcategory.service';
import { CategorySubcategoryStore } from '../service/category-subcategory.store';

import { ISubCategoryDataModel } from './../model/subCategory-data.model';
import { ICategoryWithSubCategoryModel } from '../model/category-subcategory.model';

@Component({
  selector: 'app-category-subcategory',
  templateUrl: './category-subcategory.component.html',
  styleUrls: ['./category-subcategory.component.scss']
})
export class CategorySubcategoryComponent implements OnInit,OnDestroy {

  categoryForm: FormGroup;
  subCategoryForm: FormGroup;

  dataSource : Array<ISubCategoryDataModel>=[];
  catObservable$!: Observable<any>;
  catObservableSubscriber:any;
  panelOpenState: boolean = true;
  showSubCategory: boolean = false;
  isThereAnyCategory: boolean = false;
  subCategoryIdx: number = -1;
  categoryOpenPanelIndex:number = -1;
  displayedColumns: string[] = ['position', 'name', 'status'];
  
  constructor(private catSubCatService: CategorySubcategoryService,
    private catStore: CategorySubcategoryStore, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required]
    });
    this.subCategoryForm = this.fb.group({
      subCategoryName: ['', Validators.required]
    });

    console.log("category store");
    console.log(this.catStore.categoryObs$);
  }


  ngOnInit(): void {
    this.getAllCategory();
  }
  createCategory() {
    if (this.categoryForm.valid) {
      this.catSubCatService.cteateCategory(this.categoryForm.value);
      this.categoryForm.reset();
    }
  }



  getAllCategory() {
    this.catObservable$ = this.catStore.categoryObs$;
    
    this.catObservableSubscriber = this.catObservable$.subscribe((data) => {
      this.isThereAnyCategory = data == null ? false : (data.length == 0 ? false : true);
      console.log("called");

      if(this.categoryOpenPanelIndex != -1 && data !=undefined && data != null && data[this.categoryOpenPanelIndex]!= undefined){
        this.dataSource  = this.catSubCatService.createDataSource(data[this.categoryOpenPanelIndex].subCategory);
      }

    });
  }


  createSubCategory(category: Partial<ICategoryWithSubCategoryModel>) {
    if (this.subCategoryForm.valid) {
      console.log(this.subCategoryForm.value);
      this.catSubCatService.createSubCategory(category, this.subCategoryForm.value);
      this.subCategoryForm.reset();
    }
  }

  toggleSubCategory(index: number) {
    this.subCategoryIdx = (this.subCategoryIdx == index) ? -1 : index;
  }

  panelEvent(idx:number, categoryObj: ICategoryWithSubCategoryModel) {
    this.categoryOpenPanelIndex = idx;
    this.dataSource  = this.catSubCatService.createDataSource(categoryObj.subCategory);
  }

  ngOnDestroy(){
    this.catObservableSubscriber.unsubscribe();
    console.log("ng destroy");
    console.log(this.catStore.categoryObs$);
  }
}
