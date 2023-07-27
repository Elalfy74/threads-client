import { inject } from '@angular/core';
import { ThreadsService } from './threads.service';
import {
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Thread } from './interfaces';

export const threadResolver: ResolveFn<Thread> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(ThreadsService).findOne(route.paramMap.get('threadId')!);
};
