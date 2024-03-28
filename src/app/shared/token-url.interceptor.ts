import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { environment } from './../../environments/environment';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class TokenAndUrlInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return this.authService.currentUser.pipe(
      take(1),
      exhaustMap((user) => {
        const modifiedReq = req.clone({
          url: `${environment.url}/api/${req.url}`,
          withCredentials: true,
          headers: req.headers.append(
            'Authorization',
            `Bearer ${user?.accessToken}`,
          ),
        });

        return next.handle(modifiedReq);
      }),
    );
  }
}
