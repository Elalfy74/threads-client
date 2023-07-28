import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { Actions, ThreadsService } from '../threads/threads.service';
import { NewReply } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class RepliesService {
  private readonly url = 'replies';

  constructor(
    private http: HttpClient,
    private threadsService: ThreadsService,
  ) {}

  create(threadId: string, content: string) {
    return this.http
      .post<NewReply>(`${this.url}`, { postId: threadId, content })
      .pipe(
        tap((reply) =>
          this.threadsService.localModify({
            action: Actions.REPLY_CREATED,
            payload: {
              threadId,
              reply,
            },
          }),
        ),
      );
  }

  find(threadId: string) {
    return this.http.get(`${this.url}/${threadId}`);
  }
}
