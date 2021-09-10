import { AuthStoreService } from './../../../auth/service/auth.store';
import { Observable } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sideNavToggle = new EventEmitter<void>();
  isLoggedOn$: Observable<boolean>;
  constructor(private authStore: AuthStoreService) {
    this.isLoggedOn$ = this.authStore.isLoggedOn$;
  }

  ngOnInit(): void {

  }

  onToggleSideNav() {
    this.sideNavToggle.emit();
  }
}
