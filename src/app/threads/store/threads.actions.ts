import { createAction, props } from '@ngrx/store';
import { Thread } from '../interfaces';

export const addThreadStart = createAction(
  '[Threads] Add Thread Start',
  props<{ data: FormData }>(),
);

export const addThreadSuccess = createAction(
  '[Threads] Add Thread Success',
  props<{ newThread: Thread }>(),
);

export const addLikeToThread = createAction(
  '[Threads] Add Like To Thread',
  props<{ threadId: string }>(),
);

export const removeLikeFromThread = createAction(
  '[Threads] Remove Like From Thread',
  props<{ threadId: string }>(),
);

export const addReplyToThread = createAction(
  '[Threads] Add Reply To Thread',
  props<{ threadId: string }>(),
);

export const loadThreadsStart = createAction('[Threads] Load Threads Start');

export const loadThreadsSuccess = createAction(
  '[Threads] Load Threads Success',
  props<{ threads: Thread[] }>(),
);
