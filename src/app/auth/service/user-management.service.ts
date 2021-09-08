import { UsreModel } from './../model/user.model';
import { DateHelper } from './../../shared/utils/date.util';
import { Injectable } from '@angular/core';
// import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  user!: UsreModel;

  constructor() { }

  prepareUserAndSave(userForm: any) {
    const dob = userForm.dob;
    console.log(dob);
    this.user = new UsreModel(userForm.firstName,
      userForm.lastName, userForm.gender,
      userForm.emailId, userForm.phoneNumber,
      dob, userForm.isAcceptedTerms
    );
    
      




  }

}
