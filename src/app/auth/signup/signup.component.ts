import { UserManagementService } from './../service/user-management.service';
import { DateHelper } from './../../shared/utils/date.util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { confirmPassword, createPasswordStrengthValidator, validatePhoneNumber } from 'src/app/shared/validation/custom-form-validation';
import { Utility } from 'src/app/shared/utils/other.util';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  //breakPoint: number;
  registrationForm: FormGroup;


  constructor(private userService: UserManagementService,
    private fb: FormBuilder, private router: Router) {
    //this.breakPoint = (window.innerWidth <= 600) ? 1 : 2;

    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), createPasswordStrengthValidator()]],
      confirmPassword: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, validatePhoneNumber()]],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      isAcceptedTerms: [true, Validators.required]
    }, { validators: [confirmPassword()] });

  }

  ngOnInit(): void {
  }

  goTosignup() {
    this.router.navigate(['/signin']);
  }

  onResize(event: any) {
    // this.breakPoint = (event.target.innerWidth <= 600) ? 1 : 2;
    console.log(event);
    // console.log(this.breakPoint);
  }

  register() {
    if (this.registrationForm.valid) {
      this.userService.prepareUserAndSave(this.registrationForm.value);
      
    } else {

    }
  }
}
