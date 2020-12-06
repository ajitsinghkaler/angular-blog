import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { BlogService } from 'src/app/services/blogs/blog.service';
import { UsersService } from 'src/app/services/users/users.service';
import { BlogEntriesData } from 'src/app/shared/models/blog-entries.interface';
import { User } from 'src/app/shared/models/user-data.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  private userId$: Observable<number> = this.route.params.pipe(
    map((params: Params) => Number(params.id))
  );

  user$: Observable<User> = this.userId$.pipe(
    switchMap((userId: number) => this.userService.findUser(userId))
  );

  blogEntries$: Observable<BlogEntriesData> = this.userId$.pipe(
    switchMap((userId: number) => this.blogService.indexByUser(userId, 1, 10))
  );
  URL = environment.url + environment.BASE_URL;
  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private blogService: BlogService
  ) {}

  onPaginateChange(event: PageEvent): any {
    return this.userId$
      .pipe(
        tap(
          (userId: number) =>
            (this.blogEntries$ = this.blogService.indexByUser(
              userId,
              event.pageIndex,
              event.pageSize
            ))
        )
      )
      .subscribe();
  }
}
