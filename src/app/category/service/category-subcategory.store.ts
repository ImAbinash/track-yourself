import { NotificationService } from './../../core/service/notification/notification.service';
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, finalize, map, shareReplay, take, tap } from 'rxjs/operators';

import { convertDataToCategoryObject, convertDataToSubCategoryObject, ICategoryWithSubCategoryModel, ISubCategory } from '../model/category-subcategory.model';
import { AuthStoreService } from './../../auth/service/auth.store';

@Injectable({
  providedIn: 'root'
})
export class CategorySubcategoryStore {

  private readonly categoryDbPath = '/category/';
  private readonly subCategoryDocName = 'subCategory';


  private categoryRef: AngularFirestoreCollection<Partial<ICategoryWithSubCategoryModel>>;

  private categorySubject = new BehaviorSubject<Array<Partial<ICategoryWithSubCategoryModel>> | null>(null);

  private testSub = new BehaviorSubject<string|null>(null);


  categoryObs$: Observable<Array<Partial<ICategoryWithSubCategoryModel>> | null>;

  constructor(private authStore: AuthStoreService, private firestore: AngularFirestore, private notification: NotificationService) {

    this.categoryRef = this.firestore.collection(this.categoryDbPath);
    this.categoryObs$ = this.categorySubject.asObservable();

    this.getAllCategory();

  }



  getAllCategory() {
    let userId: string;
    this.authStore.user$.subscribe((data) => {
      userId = data?.id || "";
    });

    const obs = this.firestore.collection(this.categoryDbPath, ref =>
      ref.where('userId', '==', userId)).valueChanges().pipe(
        shareReplay(1),
        map(response => response),
        tap(data => {
          const categoryResponseObj: Array<Partial<ICategoryWithSubCategoryModel>> = [];
          data.forEach(element => {
            const categoryData = convertDataToCategoryObject(element);
            categoryData.subCategory = categoryData.subCategory == undefined ? [] : categoryData.subCategory;
            this.getAllSubCategory(categoryData);
            categoryResponseObj.push({ ...categoryData });
          });
          this.categorySubject.next(categoryResponseObj);
          this.notification.showSuccess("Category & sub-category fetched successfully.!!");
          console.log("category store log",this.categorySubject);
        }),
        take(1),
        catchError((err) => {
          this.categorySubject.next(null);
          return throwError(err);
        })
      ).subscribe();

  }

  getAllSubCategory(category: Partial<ICategoryWithSubCategoryModel>) {
     this.firestore.collection(this.categoryDbPath).doc(category.id).collection(this.subCategoryDocName)
      .valueChanges()
      .pipe(
        map(data => {
          data.forEach(element => {
            const subCatObj = convertDataToSubCategoryObject(element);
            category.subCategory?.push(subCatObj);
          });
        }),
        take(1)
      ).subscribe();
  }


  saveCategory(categoryObj: Partial<ICategoryWithSubCategoryModel>) {
    try {
      this.categoryRef.doc(categoryObj.id).set({ ...categoryObj })
        .then(data => {

          const value = this.categorySubject.getValue();
          if (value == null) {
            const categoryArray = [];
            categoryArray.push({...categoryObj});
            this.categorySubject.next(categoryArray.slice());
          } else if (value.length == 0) {
            const categoryArray = [];
            categoryArray.push({...categoryObj});
            this.categorySubject.next(categoryArray.slice());
          } else {
            value.push({...categoryObj});
            this.categorySubject.next(value.slice());
          }
          this.notification.showSuccess("Category saved successfully..!!");
        });
    } catch (error: any) {
      const message = "Some error occured, Please contact support.";
      if (error.code != null || error.code !== undefined)
        this.notification.showError(error?.code);
      else
        this.notification.showError(message);
      console.log(error);
    }
  }


  savesubCategory(category: Partial<ICategoryWithSubCategoryModel>, suCategoryObj: ISubCategory) {
    try {
      this.categoryRef.doc(category.id).collection(this.subCategoryDocName).doc(suCategoryObj.id).set({ ...suCategoryObj });
      const value = this.categorySubject.getValue();

      value?.forEach(element => {
        if(element.id == category.id)
          element.subCategory?.push(suCategoryObj);
      });
      this.categorySubject.next(value);
      this.notification.showSuccess("Sub category created sucessfully..!!");

    } catch (error: any) {
      const message = "Some error occured, Please contact support.";
      if (error.code != null || error.code !== undefined)
        this.notification.showError(error?.code);
      else
        this.notification.showError(message);
      console.log(error);
    }
  }



}
