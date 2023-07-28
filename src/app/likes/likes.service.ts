import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { Actions, ThreadsService } from '../threads/threads.service';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  private readonly url = 'likes';

  constructor(
    private http: HttpClient,
    private threadsService: ThreadsService,
  ) {}

  create(threadId: string) {
    return this.http.post(`${this.url}`, { postId: threadId }).pipe(
      tap(() =>
        this.threadsService.localModify({
          action: Actions.LIKE_CREATED,
          payload: {
            threadId,
          },
        }),
      ),
    );
  }

  remove(threadId: string) {
    return this.http.delete(`${this.url}/${threadId}`).pipe(
      tap(() =>
        this.threadsService.localModify({
          action: Actions.LIKE_REMOVED,
          payload: {
            threadId,
          },
        }),
      ),
    );
  }
}
