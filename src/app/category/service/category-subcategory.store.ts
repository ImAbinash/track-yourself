import { NotificationService } from './../../core/service/notification/notification.service';
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

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
  categoryObs$: Observable<Array<Partial<ICategoryWithSubCategoryModel>> | null>;

  constructor(private authStore: AuthStoreService, private firestore: AngularFirestore, private notification: NotificationService) {

    this.categoryRef = this.firestore.collection(this.categoryDbPath);
    this.categoryObs$ = this.categorySubject.asObservable();

    //call once in its life 
    this.getAllCategory();
  }



  getAllCategory() {
    let userId: string;
    this.authStore.user$.subscribe((data) => {
      userId = data?.id || "";
    })

    this.firestore.collection(this.categoryDbPath, ref =>
      ref.where('userId', '==', userId)).valueChanges().pipe(
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
          this.notification.showSuccess("Category fetched successfully!");
        }),
        catchError((err) => {
          this.categorySubject.next(null);
          return throwError(err);
        }),
        shareReplay()
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
        tap((data) => {
        }),
        shareReplay()
      ).subscribe((data) => {
      })
  }


  saveCategory(categoryObj: Partial<ICategoryWithSubCategoryModel>) {
    try {
      const cateogryPromise = this.categoryRef.doc(categoryObj.id).set({ ...categoryObj });
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
    const subcategoryPromise = this.categoryRef.doc(category.id).collection(this.subCategoryDocName).doc(suCategoryObj.id).set({ ...suCategoryObj });
    const subcategoryObs$ = from(subcategoryPromise).pipe(
      map(response => response),
      catchError(error => {
        // this.categorySubject.next(null);
        const message = "some error occured!";
        return throwError(message)
      }),
      tap(() => {
        //  const newCatObj:Array<Partial<ICategoryWithSubCategoryModel>>=[];
        //  newCatObj.push({...categoryObj});
        //   this.categorySubject.next(newCatObj);
      }),
      shareReplay()
    );
    subcategoryObs$.subscribe();
  }



}
