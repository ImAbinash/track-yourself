import { CategorySubcategoryService } from './service/category-subcategory.service';
import { CategorySubcategoryComponent } from './category-subcategory/category-subcategory.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',component:CategorySubcategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[CategorySubcategoryService]
})
export class CategoryRoutingModule { }
