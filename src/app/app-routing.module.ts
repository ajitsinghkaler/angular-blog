import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { HomeComponent } from './shared/components/home/home.component';
import { UsersComponent } from './shared/components/user/users/users.component';
import { UserProfileComponent } from './shared/components/user/user-profile/user-profile.component';
import { UpdateUserProfileComponent } from './shared/components/user/update-user-profile/update-user-profile.component';
import { CreateBlogEntryComponent } from './shared/components/blog-entry/create-blog-entry/create-blog-entry.component';
import { ViewBlogEntryComponent } from './shared/components/blog-entry/view-blog-entry/view-blog-entry.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UsersComponent,
      },
      {
        path: ':id',
        component: UserProfileComponent,
      },
    ],
  },
  {
    path: 'update-profile',
    component: UpdateUserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-blog-entry',
    component: CreateBlogEntryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'blog-entry/:id',
    component: ViewBlogEntryComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
