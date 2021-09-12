import { AuthStoreService } from './../../auth/service/auth.store';
import { NotificationService } from './../../core/service/notification/notification.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { from } from 'rxjs';
import { catchError, map, shareReplay, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { convertDataToCashFlowModel, ICashFlow } from '../model/cash-flow.model';

@Injectable({
    providedIn: 'root'
})
export class CashFlowStore {

    private readonly cashFlowDbPath = '/cashFlow/';
    private readonly tag = "/user/";
    private cashFlowRef: AngularFirestoreCollection<ICashFlow>;
    private tagRef!: AngularFirestoreCollection<Array<string>>;
    cashFlow$: Observable<Array<ICashFlow> | null>;
    private cashFlowSubject = new BehaviorSubject<Array<ICashFlow> | null>(null);
    constructor(private router: Router, private firestore: AngularFirestore, private notificationService: NotificationService, private authStore: AuthStoreService) {
        this.cashFlowRef = this.firestore.collection(this.cashFlowDbPath);
        this.cashFlow$ = this.cashFlowSubject.asObservable();
        this.getAllCashFlowDetails();
    }

    createcashFlow(cashFlowObj: Partial<ICashFlow>) {
        try {
            const newCashFlowObj = convertDataToCashFlowModel(cashFlowObj);
            this.cashFlowRef.doc(cashFlowObj.id).set({ ...newCashFlowObj })
                .then((data) => {
                    this.notificationService.showSuccess("Saved successfully..!");
                    const value = this.cashFlowSubject.getValue();
                    if (value != null) {
                        value.push({ ...newCashFlowObj });
                        this.cashFlowSubject.next(value.slice());
                    } else {
                        this.cashFlowSubject.next([{ ...newCashFlowObj }].slice());
                    }
                });
        } catch (error: any) {
            const message = "Some error occured, Please contact support.";
            if (error.code != null || error.code !== undefined)
                this.notificationService.showError(error?.code);
            else
                this.notificationService.showError(message);
            console.log(error);
        }
    }

    getAllCashFlowDetails() {
        let userId: string;
        this.authStore.user$.subscribe((data) => {
            userId = data?.id || "";
        })

        this.firestore.collection(this.cashFlowDbPath, ref =>
            ref.where('userId', '==', userId)).valueChanges().pipe(
                map(response => response),
                tap(data => {
                    const cashflowObj: Array<ICashFlow> = [];
                    data.forEach(element => {
                        const cashFlowModelObj = convertDataToCashFlowModel(element);
                        cashflowObj.push(cashFlowModelObj)
                    });
                    this.cashFlowSubject.next(cashflowObj.slice());
                    this.notificationService.showSuccess('CashFlow list fetched successfuly..!!');
                }),
                catchError((err) => {
                    return throwError(err);
                }),
                take(1),
                shareReplay()
            ).subscribe();
    }


    


}
