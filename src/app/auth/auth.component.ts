import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { AuthDto, CurrentUser } from './interfaces';

@Component({
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginView = true;
  isLoading = false;
  error?: string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  toggleView() {
    this.isLoginView = !this.isLoginView;
    this.error = undefined;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;
    const dto: AuthDto = form.value;

    let authObs: Observable<CurrentUser>;

    if (this.isLoginView) {
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
