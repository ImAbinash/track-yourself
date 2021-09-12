import { CategorySubcategoryService } from './service/category-subcategory.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';

import { NgMaterialModule } from '../ng-material/ng-material.module';

import { CategoryRoutingModule } from './category-routing.module';
import { CategorySubcategoryComponent } from './category-subcategory/category-subcategory.component';


@NgModule({
  declarations: [
    CategorySubcategoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgMaterialModule,
    FlexLayoutModule,
    CategoryRoutingModule
  ],
  providers:[CategorySubcategoryService]
})
export class CategoryModule { }
