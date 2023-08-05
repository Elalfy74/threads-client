import { Injectable } from '@angular/core';
import { map, exhaustMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AppState } from 'src/app/app.state';
import { ThreadsService } from '../threads.service';
import { AuthService } from 'src/app/auth/auth.service';

import {
  removeLikeFromThread,
  addLikeToThread,
  addThreadStart,
  addThreadSuccess,
  loadThreadsStart,
  loadThreadsSuccess,
  addReplyToThread,
  appendThreadsStart,
  appendThreadsSuccess,
} from './threads.actions';

import { selectAllThreads } from './threads.selectors';

@Injectable()
export class ThreadsEffects {
  constructor(
    private actions$: Actions,
    private threadsService: ThreadsService,
    private store: Store<AppState>,
    private authService: AuthService,
  ) {}

  loadThreads$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadThreadsStart),
      exhaustMap(() =>
        this.threadsService
          .find()
          .pipe(map((threads) => loadThreadsSuccess({ threads }))),
      ),
    ),
  );

  appendThreads$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appendThreadsStart),
      exhaustMap(({ page, itemsPerPage }) =>
        this.threadsService
          .find(page, itemsPerPage)
          .pipe(map((threads) => appendThreadsSuccess({ threads }))),
      ),
    ),
  );

  addThread$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addThreadStart),
      withLatestFrom(this.authService.currentUser),
      exhaustMap(([{ data }, user]) =>
        this.threadsService.create(data).pipe(
          map((newThreadRes) => {
            const newThread = this.threadsService.localCreateThread(
              newThreadRes,
              user?.user!,
            );
            return addThreadSuccess({ newThread });
          }),
        ),
      ),
    ),
  );

  modifyLike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addLikeToThread, removeLikeFromThread),
      withLatestFrom(this.store.select(selectAllThreads)),
      map(([{ threadId, type }, oldThreads]) => {
        const newThreads = this.threadsService.localModifyLike(
          {
            action: type,
            payload: {
              threadId,
            },
          },
          oldThreads,
        );

        return loadThreadsSuccess({ threads: newThreads });
      }),
    ),
  );

  addReply$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addReplyToThread),
      withLatestFrom(this.store.select(selectAllThreads)),
      map(([{ threadId }, oldThreads]) => {
        const newThreads = this.threadsService.localModifyReply(
          threadId,
          oldThreads,
        );

        return loadThreadsSuccess({ threads: newThreads });
      }),
    ),
  );
}
