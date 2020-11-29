import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserData } from 'src/app/shared/models/user-data.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  findAll(page: number, limit: number): Observable<UserData> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(limit));
    console.log(params.toString());
    return this.http
      .get<UserData>('users', { params })
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
      .get<UserData>('users', { params })
      .pipe(catchError((err) => throwError(err)));
  }


}
