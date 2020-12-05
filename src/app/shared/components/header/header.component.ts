import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  entries = [
    {
      name: 'Login',
      link: 'login',
    },
    {
      name: 'Register',
      link: 'register',
    },
    {
      name: 'Update Profile',
      link: 'update-profile',
    },
  ];
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  navigateTo(value: string): void {
    this.router.navigate(['../', value]);
  }

  logout(): void {
    this.authService.logout();
  }
}
