import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user-data.interface';
import { LoginForm } from 'src/app/shared/models/util.interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginForm: LoginForm): Observable<string> {
    return this.http
      .post<{ access_token: string }>('users/login', {
        email: loginForm.email,
        password: loginForm.password,
      })
      .pipe(
        tap((token) => {
          localStorage.setItem('token', token.access_token);
        }),
        mapTo('Logged in successfully')
      );
  }

  register(user: User): Observable<string> {
    return this.http.post('users', user).pipe(mapTo('Registered successfully'));
  }
}
