import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HomeComponent } from './shared/components/home/home.component';
import { BlogEntriesComponent } from './shared/components/blog-entry/blog-entries/blog-entries.component';
import { CreateBlogEntryComponent } from './shared/components/blog-entry/create-blog-entry/create-blog-entry.component';
import { UsersComponent } from './shared/components/user/users/users.component';
import { UpdateUserProfileComponent } from './shared/components/user/update-user-profile/update-user-profile.component';
import { UserProfileComponent } from './shared/components/user/user-profile/user-profile.component';
import { ViewBlogEntryComponent } from './shared/components/blog-entry/view-blog-entry/view-blog-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    UpdateUserProfileComponent,
    UserProfileComponent,
    HomeComponent,
    BlogEntriesComponent,
    CreateBlogEntryComponent,
    ViewBlogEntryComponent,
  ],
  imports: [
    MarkdownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
