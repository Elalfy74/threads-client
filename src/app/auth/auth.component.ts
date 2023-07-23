import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from './auth.service';
import { AuthDto, CurrentUser } from './interfaces';

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
  error?: string;

  toggleView() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const dto: AuthDto = form.value;

    let authObs: Observable<CurrentUser>;

    this.isLoading = true;

    if (this.isLogin) {
      authObs = this.authService.login(dto);
    } else {
      authObs = this.authService.register(dto);
    }

    authObs.subscribe({
      next: () => {
        this.isLoading = false;
        form.reset();
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.error = err.message;
      },
    });
  }
}
