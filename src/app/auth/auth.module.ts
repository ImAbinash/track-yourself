
//angular api
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//custom modules
import { NgMaterialModule } from '../ng-material/ng-material.module';
import { AuthRoutingModule } from './auth-routing.module';
//services
import { UserManagementService } from './service/user-management.service';
//components
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgMaterialModule,
    FlexLayoutModule,
    AuthRoutingModule
  ],
  providers:[
    UserManagementService
  ]
})
export class AuthModule { }
