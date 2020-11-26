import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<string> {
    return this.http
      .post<{ access_token: string }>('users/login', { email, password })
      .pipe(
        tap((token) => {
          localStorage.setItem('token', token.access_token);
        }),
        mapTo('Logged in successfully')
      );
  }
}
