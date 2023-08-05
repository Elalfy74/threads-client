import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';

import { ThreadsState } from '../threads/store/threads.reducer';
import {
  removeLikeFromThread,
  addLikeToThread,
} from '../threads/store/threads.actions';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  private readonly url = 'likes';

  constructor(
    private http: HttpClient,
    private store: Store<{ threads: ThreadsState }>,
  ) {}

  create(threadId: string) {
    return this.http
      .post(`${this.url}`, { postId: threadId })
      .pipe(tap(() => this.store.dispatch(addLikeToThread({ threadId }))));
  }

  remove(threadId: string) {
    return this.http
      .delete(`${this.url}/${threadId}`)
      .pipe(tap(() => this.store.dispatch(removeLikeFromThread({ threadId }))));
  }
}
