import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toasterService:ToastrService) { }

  showSuccess(message:string){
    this.toasterService.success(message);
  }
  showInfo(message:string){
    this.toasterService.info(message);
  }
  showWarning(message:string){
    this.toasterService.warning(message);
  }
  showError(message:string){
    this.toasterService.error(message);
  }

}
