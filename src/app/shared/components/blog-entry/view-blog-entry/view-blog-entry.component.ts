import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { BlogService } from 'src/app/services/blogs/blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-blog-entry',
  templateUrl: './view-blog-entry.component.html',
  styleUrls: ['./view-blog-entry.component.scss'],
})
export class ViewBlogEntryComponent implements OnInit {
  URL = environment.url + environment.BASE_URL;

  blogEntry$ = this.route.params.pipe(
    switchMap((params: Params) => {
      const id = Number(params.id);
      return this.blogService.findEntry(id);
    })
  );
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
}
