import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BlogService } from 'src/app/services/blogs/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageableBlogs = this.blogService.indexAll(1, 10);
  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
  }

  onPaginateChange(event: PageEvent): void {
    this.pageableBlogs = this.blogService.indexAll(event.pageIndex, event.pageSize);
  }

}
