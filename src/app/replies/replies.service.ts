import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

import { NewReply } from './interfaces';
import { Store } from '@ngrx/store';
import { Thread } from '../threads/interfaces';
import { addReplyToThread } from '../threads/store/threads.actions';

@Injectable({
  providedIn: 'root',
})
export class RepliesService {
  private readonly url = 'replies';

  constructor(
    private http: HttpClient,
    private store: Store<{ threads: Thread[] }>,
  ) {}

  create(threadId: string, content: string) {
    return this.http
      .post<NewReply>(`${this.url}`, {
        postId: threadId,
        content,
      })
      .pipe(tap(() => this.store.dispatch(addReplyToThread({ threadId }))));
  }

  find(threadId: string) {
    return this.http.get(`${this.url}/${threadId}`);
  }
}
