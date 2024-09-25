import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userNameSource = new BehaviorSubject<string | null>(null);
  currentUserName = this.userNameSource.asObservable();

  private registerUrl = 'http://localhost/register.php';
  private loginUrl = 'http://localhost/login.php';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, user);
  }

  login(user: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, user);
  }

  setUserName(name: string): void {
    this.userNameSource.next(name);
  }
}
