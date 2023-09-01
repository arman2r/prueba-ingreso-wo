import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environemnts/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(usuario: string, password: string) {

      //return this.http.post(`${environment.API_URL}/login?`+'username='+usuario+'&'+'password='+password, null)

      return this.http.post<any>(`${environment.API_URL}/login?`+'username='+usuario+'&'+'password='+password, null, {withCredentials: true})
          .pipe(map(user => {
              console.log('que trae el login',user)
              // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
              //user.authdata = window.btoa(usuario + ':' + password);
              localStorage.setItem('currentUser', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
              this.currentUserSubject.next(user);
              return user;
          }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null!);
    }

}
