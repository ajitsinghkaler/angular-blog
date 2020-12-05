import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BlogService } from 'src/app/services/blogs/blog.service';
import { environment } from 'src/environments/environment';
import { File } from '../../models/util.interface';

@Component({
  selector: 'app-create-blog-entry',
  templateUrl: './create-blog-entry.component.html',
  styleUrls: ['./create-blog-entry.component.scss'],
})
export class CreateBlogEntryComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload!: ElementRef;
  URL = environment.url + environment.BASE_URL;
  file: File = {
    data: null,
    inProgress: false,
    progress: 0,
  };

  form = this.formBuilder.group({
    title: [null, [Validators.required]],
    slug: [{ value: null, disabled: true }],
    description: [null, [Validators.required]],
    body: [null, [Validators.required]],
    headerImage: [null, [Validators.required]],
  });
  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  post(): void {
    if (this.form.valid) {
      this.blogService
        .post(this.form.getRawValue())
        .pipe(tap(() => this.router.navigate(['../'])))
        .subscribe();
    }
  }

  onClick(): void {
    const fileInput = this.fileUpload.nativeElement;
    fileInput.click();
    fileInput.onchange = () => {
      this.file.data = fileInput.files[0];
      this.fileUpload.nativeElement.value = '';
      this.uploadFile();
    };
  }

  uploadFile(): void {
    const formData = new FormData();
    formData.append('file', this.file.data);
    this.file.inProgress = true;
    this.blogService
      .uploadHeaderImage(formData)
      .pipe(
        map(
          (event) => {
            switch (event.type) {
              case HttpEventType.UploadProgress:
                this.file.progress = Math.round(
                  event.total ? (event.loaded * 100) / event.total : 0
                );
                break;
              case HttpEventType.Response:
                return event;
            }
          },
          catchError(() => {
            this.file.inProgress = false;
            return of('Upload Failed');
          })
        )
      )
      .subscribe((event) => {
        if (typeof event === 'object') {
          this.form.get('headerImage')?.setValue(event.body.filename);
        }
      });
  }
}
