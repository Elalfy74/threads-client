import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { take, map } from 'rxjs';

import { AuthService } from './auth.service';

export function authGuard(): CanActivateFn {
  return () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    return authService.user.pipe(
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
