import { AuthStoreService } from './../service/auth.store';
import { UserManagementService } from './../service/user-management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;

  constructor(private authStore: AuthStoreService, private userService: UserManagementService,
    private fb: FormBuilder, private router: Router) {

    this.signInForm = fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.authStore.user$.subscribe((data)=>{
      console.log("Logged in user! ", data);
    })
  }
  goToSignup() {
    this.router.navigate(["/signup"]);
  }

  doLogin() {
    console.log(this.signInForm.value);
    this.userService.userLogon(this.signInForm.value);
  }


  


}
