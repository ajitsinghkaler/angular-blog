import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BlogService } from 'src/app/services/blogs/blog.service';
import { BlogEntriesData } from 'src/app/shared/models/blog-entries.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-entries',
  templateUrl: './blog-entries.component.html',
  styleUrls: ['./blog-entries.component.scss'],
})
export class BlogEntriesComponent {
  URL = environment.url + environment.BASE_URL;
  @Input() blogEntries!: BlogEntriesData | null;
  @Output() paginate = new EventEmitter<PageEvent>();

  onPaginateChange(event: PageEvent): void {
    event.pageIndex = event.pageIndex + 1;
    this.paginate.emit(event);
  }
}
