import { Component } from '@angular/core';
import { AuthDto, UserDto } from './interfaces';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  isLogin = false;
  isLoading = false;

  toggleView() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const dto: AuthDto = form.value;

    let authObs: Observable<UserDto>;

    this.isLoading = true;

    if (this.isLogin) {
      authObs = this.authService.login(dto);
    } else {
      authObs = this.authService.register(dto);
    }

    authObs.subscribe((resData) => {
      console.log(resData);
      this.isLoading = false;
      form.reset();
      this.router.navigate(['/']);
    });
  }
}
