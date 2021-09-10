import { Observable } from 'rxjs';
import { AuthStoreService } from './auth/service/auth.store';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'track-yourself';
  isLoggedOn$:Observable<boolean>;
  constructor(private authStore:AuthStoreService){
    authStore.logonStatus();
    this.isLoggedOn$=this.authStore.isLoggedOn$;
    console.log("is login observagle");
    console.log(this.isLoggedOn$);
    this.isLoggedOn$.subscribe((data)=>{
      console.log("ISLogin ", data);
    })
  }



}
