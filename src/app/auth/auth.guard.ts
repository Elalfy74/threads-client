import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { take, map, Observable } from 'rxjs';

import { AuthService } from './auth.service';

export function authGuard(): CanActivateFn {
  return (): Observable<boolean | UrlTree> => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    return authService.currentUser.pipe(
      take(1),
      map((user) => {
        if (user) {
          return true;
        }
        return router.createUrlTree(['/auth']);
      }),
    );
  };
}
