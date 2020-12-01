import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from '../../models/user-data.interface';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.scss'],
})
export class UpdateUserProfileComponent implements OnInit {
  form = this.formBuilder.group({
    id: [{ value: null, disabled: true }, [Validators.required]],
    name: [null, [Validators.required]],
    username: [null, [Validators.required]],
  });
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.authService
      .getUserId()
      .pipe(
        switchMap((id: number = -1) =>
          this.userService.findUser(id).pipe(
            tap((user: User) => {
              this.form.patchValue({
                id: user.id,
                name: user.name,
                username: user.username,
              });
            })
          )
        )
      )
      .subscribe();
  }

  update(): void {
    this.userService.updateUser(this.form.getRawValue()).subscribe();
  }
}
