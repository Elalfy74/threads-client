import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class TokenAndUrlInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let modifiedReq;

    return this.authService.currentUser.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          modifiedReq = req.clone({
            url: `http://localhost:3000/api/${req.url}`,
            withCredentials: true,
          });
        } else {
          modifiedReq = req.clone({
            url: `http://localhost:3000/api/${req.url}`,
            headers: req.headers.append(
              'Authorization',
              `Bearer ${user.accessToken}`,
            ),
            withCredentials: true,
          });
        }
        return next.handle(modifiedReq);
      }),
    );
  }
}
