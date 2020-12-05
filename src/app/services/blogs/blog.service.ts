import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, share } from 'rxjs/operators';
import {
  BlogEntriesData,
  BlogEntry,
} from 'src/app/shared/models/blog-entries.interface';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  BASE_USER_URL = 'blogs';
  constructor(private http: HttpClient) {}

  indexAll(page: number, limit: number): Observable<BlogEntriesData> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(limit));
    return this.http
      .get<BlogEntriesData>(this.BASE_USER_URL, { params })
      .pipe(
        share(),
        catchError((err) => throwError(err))
      );
  }

  post(blogEntry: BlogEntry): Observable<BlogEntry> {
    return this.http.post<BlogEntry>(this.BASE_USER_URL, blogEntry);
  }

  uploadHeaderImage(formData: FormData): Observable<any> {
    return this.http.post(this.BASE_USER_URL + `/image/upload`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
