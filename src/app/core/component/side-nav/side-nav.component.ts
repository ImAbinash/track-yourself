import { AuthStoreService } from './../../../auth/service/auth.store';
import { Router } from '@angular/router';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Output() sideNavCloseHandler = new EventEmitter
  constructor(private router:Router,private authStore:AuthStoreService) { }

  ngOnInit(): void {
  }

  closeSideNav(){
    this.sideNavCloseHandler.emit();
  }
  logOut(){
    console.log("Side nav log out method");
    this.sideNavCloseHandler.emit();
    this.authStore.logOut();
  }
}
