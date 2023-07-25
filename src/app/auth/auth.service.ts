import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';

import { CurrentUser, AuthDto } from './interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = new BehaviorSubject<CurrentUser | null>(null);
  private url = 'auth';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  register(dto: AuthDto) {
    return this.http.post<CurrentUser>(`${this.url}/register`, dto).pipe(
      catchError(this.handleError),
      tap((resData) => {
        this.handleAuthentication(resData);
      }),
    );
  }

  login(dto: AuthDto) {
    return this.http.post<CurrentUser>(`${this.url}/login`, dto).pipe(
      catchError(this.handleError),
      tap((resData) => {
        this.handleAuthentication(resData);
      }),
    );
  }

  autoLogin() {
    const savedData = localStorage.getItem('userData');
    if (!savedData) return;

    const userData: CurrentUser = JSON.parse(savedData);
    this.currentUser.next(userData);

    this.checkAuth().subscribe({
      error: () => {
        this.logout();
      },
    });
  }

  logout() {
    this.currentUser.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/']);
  }

  private checkAuth() {
    return this.http.get(`${this.url}/checkauth`);
  }

  private handleAuthentication(userData: CurrentUser) {
    this.currentUser.next(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  private handleError(error: HttpErrorResponse) {
    const newErr = new Error(error.error.message || 'Something went wrong!');
    return throwError(() => newErr);
  }
}
