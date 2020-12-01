import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User, UserData } from 'src/app/shared/models/user-data.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  BASE_USER_URL = 'users';
  constructor(private http: HttpClient) {}

  findUser(id: number): Observable<User> {
    return this.http.get(this.BASE_USER_URL + '/' + id).pipe(tap(console.log));
  }

  findAll(page: number, limit: number): Observable<UserData> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(limit));
    console.log(params.toString());
    return this.http
      .get<UserData>(this.BASE_USER_URL, { params })
      .pipe(catchError((err) => throwError(err)));
  }

  findByUsername(
    page: number,
    limit: number,
    username: string
  ): Observable<UserData> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(limit));
    params = params.append('username', username);

    console.log(params.toString());
    return this.http
      .get<UserData>(this.BASE_USER_URL, { params })
      .pipe(catchError((err) => throwError(err)));
  }

  updateUser(user: User): Observable<User> {
    return this.http.put(this.BASE_USER_URL + `/${user.id}`, user);
  }
}
