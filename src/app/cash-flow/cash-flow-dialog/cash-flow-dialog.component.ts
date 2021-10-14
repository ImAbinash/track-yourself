import { User } from './../../auth/model/user.model';
import { AuthStoreService } from './../../auth/service/auth.store';
import { ICategoryWithSubCategoryModel, ISubCategory } from './../../category/model/category-subcategory.model';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CashFlowService } from '../service/cash-flow.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cash-flow-dialog',
  templateUrl: './cash-flow-dialog.component.html',
  styleUrls: ['./cash-flow-dialog.component.scss']
})
export class CashFlowDialogComponent implements OnInit,OnDestroy {
  cashFlowForm: FormGroup;
  constructor(private cashFlowService: CashFlowService,
     private fb: FormBuilder, 
     public dialogRef: MatDialogRef<CashFlowDialogComponent>,private authStore:AuthStoreService) {
    this.cashFlowForm = this.fb.group({
      cateoryId: ['', Validators.required],
      subCategoryId: ['', Validators.required],
      operatedAgainst: ['', Validators.required],
      operatedOnInstance: ['', Validators.required],
      amount: ['', [Validators.required]],
      description: ['', Validators.required]
    })
  };
  options: Array<string>=[];
  userId!:string;
  authObservable: any;
  category$ !: Observable<Partial<ICategoryWithSubCategoryModel>[] | undefined>;
  subCategory$ !: Observable<Partial<ISubCategory>[] | undefined>;
  ngOnInit(): void {
    this.getAllActiveCategoryWithSubcategoryList();
    this.authObservable=  this.authStore.user$.subscribe((data)=>{
      let d = data as User;
      this.options = d.tag;
      this.userId = d.id;
    });
  }
  getAllActiveCategoryWithSubcategoryList() {
    this.category$ = this.cashFlowService.getAllCategoryAndSubCategory();
  }

  onChangeCategory(event: any) {
    this.subCategory$ = this.cashFlowService.getAllSubCategory(event.value);
  }
  onChangeSubCategory(event:any){
    
  }
  saveCashFlow() {
    if (this.cashFlowForm.valid) {

      let tagName = this.cashFlowForm.get('operatedAgainst')?.value;
      let isTagPresent = this.options?.includes(tagName);
      if(!isTagPresent){
        this.options = this.options==undefined?[]:this.options;
        this.options?.push(tagName);
        this.cashFlowService.saveAllTag(this.userId,this.options?.slice())
      }


      this.cashFlowService.saveCashFlow(this.cashFlowForm.value);
      this.cashFlowForm.reset();
      this.dialogRef.close();
    }
  }
  ngOnDestroy(){
    this.authObservable?.unsubscribe();
  }
}
