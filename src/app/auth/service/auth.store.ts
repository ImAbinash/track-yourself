import { NotificationService } from './../../core/service/notification/notification.service';
import { Injectable } from '@angular/core';
//import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { from } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';

import { convertDataToUserObject, User, UsreModel } from './../model/user.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthStoreService {

    private readonly userDbPath = '/user/';
    private userRef: AngularFirestoreCollection<User>;

    private userSubject = new BehaviorSubject<User | null>(null);
    private loggedOnSubject = new BehaviorSubject<boolean>(false);
    private USER_DATA = "USER_DATA";
    user$: Observable<User | null>;
    isLoggedOn$: Observable<boolean>;
    constructor(private router: Router, private firestore: AngularFirestore, private notificationService: NotificationService) {
        this.userRef = this.firestore.collection(this.userDbPath);
        this.user$ = this.userSubject.asObservable();
        this.isLoggedOn$ = this.loggedOnSubject.asObservable();
    }

    createUser(userObj: User) {
        const userPromise = this.userRef.doc(userObj.id).set({ ...userObj });
        const userObservable = from(userPromise).pipe(
            map(response => response),
            catchError(error => {
                this.userSubject.next(null);
                const message = "some error occured!";
                return throwError(message)
            }),
            tap(() => {
                this.userSubject.next({ ...userObj });
            })
        );
        userObservable.subscribe();
    }

    login(signnObj: { emailId: string, password: string }) {
        const userSubscription = this.firestore.collection<User>(this.userDbPath, ref =>
            ref.where('emailId', '==', signnObj.emailId))
            .valueChanges().pipe(
                map(document => document),
                tap(data => {
                    const resp = data[0];
                    const convertedUserData = convertDataToUserObject({ ...resp });
                    this.userSubject.next({ ...convertedUserData });
                    this.loggedOnSubject.next(true);
                    this.notificationService.showSuccess("Successfully logged in");
                    localStorage.setItem(this.USER_DATA, JSON.stringify(resp));
                    this.goToDashBoard();
                }),
                take(1),
                catchError(error => {
                    this.userSubject.next(null);
                    return throwError(error)
                })
            ).subscribe();
    }

    logonStatus() {
        const localStorageData = (localStorage.getItem(this.USER_DATA) || '{"id":null}');
        const parsedUser: User = JSON.parse(localStorageData);
        if (parsedUser.id != null) {
            this.loggedOnSubject.next(true);
            this.userSubject.next(parsedUser);
            this.goToDashBoard();

        } else {
            this.loggedOnSubject.next(false);
            this.userSubject.next(null);
            this.goToLogin();
        }

    }
    saveTag(userId: string, tag: Array<string>) {
        try {
            this.userRef.doc(userId).update({ 'tag': tag }).then((data) => {

                const val = this.userSubject.getValue();
                let usreObj = val as User;
                if(usreObj.tag==undefined){
                    usreObj['tag'] = [];
                }
                usreObj['tag'] = tag;
                this.userSubject.next(val);
                localStorage.setItem(this.USER_DATA, JSON.stringify(val));
                this.notificationService.showSuccess("Tag added successfully...!!")
            });
        } catch (error) {
            this.notificationService.showError("tag couldn't save..!");
        }
    }

    goToLogin() {
        this.router.navigate(['/signin']);
    }
    goToDashBoard() {
        this.router.navigate(['/dashboard']);
    }
    logOut() {
        console.log("app log out")
        localStorage.removeItem(this.USER_DATA);
        this.userSubject.next(null);
        this.loggedOnSubject.next(false);
        this.goToLogin();
    }

}
