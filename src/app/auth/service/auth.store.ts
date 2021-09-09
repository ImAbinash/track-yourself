import { Injectable } from '@angular/core';
//import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { convertDataToUserObject, User, UsreModel } from './../model/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthStoreService {

    private readonly userDbPath = '/user/'
    private userRef: AngularFirestoreCollection<User>;

    private userSubject = new BehaviorSubject<User | null>(null);
    user$: Observable<User | null>;

    constructor(private firestore: AngularFirestore) {
        this.userRef = this.firestore.collection(this.userDbPath);
        this.user$ = this.userSubject.asObservable();
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
        this.firestore.collection<User>(this.userDbPath, ref =>
            ref.where('emailId', '==', signnObj.emailId))
            .valueChanges().pipe(
                map(document => document),
                tap(data => {
                    const resp = data[0];
                    const convertedUserData = convertDataToUserObject({ ...resp });
                    this.userSubject.next({ ...convertedUserData });
                }),
                catchError(error => {
                    this.userSubject.next(null);
                    return throwError(error)
                })
            ).
            subscribe((data) => console.log(data));
    }





}
