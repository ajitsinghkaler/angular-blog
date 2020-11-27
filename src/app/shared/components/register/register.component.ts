import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup(
    {
      name: new FormControl(null, [Validators.required]),
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    },
    {}
  );
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  submitRegister(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.auth
      .register(this.registerForm.value)
      .pipe(tap(() => this.router.navigate(['admin'])))
      .subscribe();
  }
}
