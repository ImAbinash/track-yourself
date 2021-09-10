import { AuthStoreService } from './../../auth/service/auth.store';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { categoryInitialization, convertDataToCategoryObject, ICategoryWithSubCategoryModel, ISubCategory } from '../model/category-subcategory.model';

@Injectable({
  providedIn: 'root'
})
export class CategorySubcategoryStore {

  private readonly categoryDbPath = '/category/';
  private readonly SubCategoryDbPath = '/subCategory/';


  private categoryRef: AngularFirestoreCollection<Partial<ICategoryWithSubCategoryModel>>;
  //private subCategoryRef: AngularFirestoreCollection<ISubCategory>;

  private categorySubject = new BehaviorSubject<Array<Partial<ICategoryWithSubCategoryModel>> | null>(null);
  categoryObs$: Observable<Array<Partial<ICategoryWithSubCategoryModel>> | null>;

  constructor(private authStore:AuthStoreService, private firestore: AngularFirestore) {

    this.categoryRef = this.firestore.collection(this.categoryDbPath)
    //this.subCategoryRef = this.firestore.collection(this.categoryDbPath+userId+"/"+this.SubCategoryDbPath);

    this.categoryObs$ = this.categorySubject.asObservable();


    //call once in its life 
    this.getCategoryAndSubCategory();
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


}
