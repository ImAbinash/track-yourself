import { Observable } from 'rxjs';
import { CategorySubcategoryService } from './../service/category-subcategory.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ICategoryWithSubCategoryModel } from '../model/category-subcategory.model';
import { CategorySubcategoryStore } from '../service/category-subcategory.store';

@Component({
  selector: 'app-category-subcategory',
  templateUrl: './category-subcategory.component.html',
  styleUrls: ['./category-subcategory.component.scss']
})
export class CategorySubcategoryComponent implements OnInit {

  panelOpenState: boolean = false;
  categoryForm: FormGroup;
  subCategoryForm: FormGroup;

  catObservable$!:Observable<any>;

  showSubCategory: boolean = false;
  constructor(private catSubCatService: CategorySubcategoryService,
    private catStore: CategorySubcategoryStore, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required]
    });
    this.subCategoryForm = this.fb.group({
      subCategoryName: ['', Validators.required]
    });

  }


  ngOnInit(): void {
    this.getAllCategory();
  }
  createCategory() {
    if (this.categoryForm.valid) {
      this.catSubCatService.cteateCategory(this.categoryForm.value);
    } else {

    }
  }



  getAllCategory() {
    this.catObservable$ =  this.catStore.categoryObs$;
    console.log("catgoryObservable: ",this.catObservable$);

  }


  createSubCategory() {
    if (this.subCategoryForm.valid) {

    }
  }

}
