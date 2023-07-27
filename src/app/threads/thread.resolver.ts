import { inject } from '@angular/core';
import {
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { ThreadsService } from './threads.service';
import { Thread } from './interfaces';

export const threadResolver: ResolveFn<Thread> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(ThreadsService).findOne(route.paramMap.get('threadId')!);
};
