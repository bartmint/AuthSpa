import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/_models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // powoduje ze w glownej app nie trzeba importowac accountservice, bo samo sie laduje
})
export class AccountService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();


  setCurrentUser(user: User): void{
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  } // setting user in localStorage


  login(model: User) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((user: User) => {
        this.setCurrentUser(user);
    })
   // login metod calling setCurrentUser
    );
  }
  logout(): void {
    localStorage.removeItem('user'); // clear localStorage
    this.currentUserSource.next(null); // setting currentUserSource as null
  }
  register(model: any){
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user){
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }
}
