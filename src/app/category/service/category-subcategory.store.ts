import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

import {  convertDataToCategoryObject, ICategoryWithSubCategoryModel, ISubCategory } from '../model/category-subcategory.model';
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

  constructor(private authStore:AuthStoreService, private firestore: AngularFirestore) {

    this.categoryRef = this.firestore.collection(this.categoryDbPath);
    this.categoryObs$ = this.categorySubject.asObservable();

    //call once in its life 
    this.getCategoryAndSubCategory();
  }



  getCategoryAndSubCategory() {
    let userId:string;
    this.authStore.user$.subscribe((data)=>{
      userId = data?.id||"";
    })

    this.firestore.collection(this.categoryDbPath, ref =>
      ref.where('userId', '==', userId)).valueChanges().pipe(
        map(response => response),
        tap(data => {
          const categoryResponseObj:Array<Partial<ICategoryWithSubCategoryModel>>=[];
          data.forEach(element => {
            const categoryData = convertDataToCategoryObject(element);
            categoryResponseObj.push({...categoryData});
          });
          this.categorySubject.next(categoryResponseObj);
        }),
        catchError((err) => {
          this.categorySubject.next(null);
          return throwError(err);
        }),
        shareReplay()
      ).subscribe();
  }



  saveCategory(categoryObj: Partial<ICategoryWithSubCategoryModel>) {
    const cateogryPromise = this.categoryRef.doc(categoryObj.id).set({ ...categoryObj });
    const userObservable = from(cateogryPromise).pipe(
      map(response => response),
      catchError(error => {
        this.categorySubject.next(null);
        const message = "some error occured!";
        return throwError(message)
      }),
      tap(() => {
       const newCatObj:Array<Partial<ICategoryWithSubCategoryModel>>=[];
       newCatObj.push({...categoryObj});
        this.categorySubject.next(newCatObj);
      }),
      shareReplay()
    );
    userObservable.subscribe();
  }


  savesubCategory(category:Partial<ICategoryWithSubCategoryModel>,suCategoryObj: ISubCategory) {
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
