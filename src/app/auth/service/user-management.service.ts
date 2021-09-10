import { AuthStoreService } from './auth.store';
import { UsreModel } from './../model/user.model';
import { DateHelper } from './../../shared/utils/date.util';
import { Injectable } from '@angular/core';
// import { User } from '../model/user.model';

@Injectable()
export class UserManagementService {

  user!: UsreModel;

  constructor(private authStoreService: AuthStoreService) { }

  prepareUserAndSave(userForm: any) {
    const dob = userForm.dob;
    console.log(dob);
    this.user = new UsreModel(userForm.firstName,
      userForm.lastName, userForm.emailId, userForm.phoneNumber, userForm.gender,
      dob, userForm.isAcceptedTerms
    );
    this.authStoreService.createUser(this.user);
  }

  userLogon(signnForm: { emailId: string, password: string }) {
    this.authStoreService.login(signnForm);
  }


}
