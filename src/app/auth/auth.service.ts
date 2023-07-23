import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { UserDto, AuthDto } from './interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<UserDto | null>(null);
  private url = 'http://localhost:3000/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  register(dto: AuthDto) {
    return this.http.post<UserDto>(`${this.url}/register`, dto).pipe(
      // catchError(this.handleError),
      tap((resData) => {
        this.handleAuthentication(resData);
      }),
    );
  }

  login(dto: AuthDto) {
    return this.http.post<UserDto>(`${this.url}/login`, dto).pipe(
      // catchError(this.handleError),
      tap((resData) => {
        this.handleAuthentication(resData);
      }),
    );
  }

  autoLogin() {
    const savedData = localStorage.getItem('userData');
    if (!savedData) return;

    const userData: UserDto = JSON.parse(savedData);

    this.user.next(userData);
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(userData: UserDto) {
    this.user.next(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  }
}
