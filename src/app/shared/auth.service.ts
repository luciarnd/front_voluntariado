import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

// User interface
export class User {
id!: number;
name!: String;
email!: String;
password!: String;
password_confirmation!: String;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  // User registration
  register(user: User): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/register', user);
  }
  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/login', user);
  }
  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/me');
  }

  logout(user: User) {
    return this.http.post('http://127.0.0.1:8000/api/logout', user);
  }

  addUser(user: User): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/user', user);
  }

  getUserByEmail(userEmail: string): Observable<any> {
    const params = new HttpParams().set('email', userEmail);
    return this.http.get(`http://127.0.0.1:8000/api/user`, {
      params: params
    });
  }
}
