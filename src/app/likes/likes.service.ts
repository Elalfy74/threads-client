import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take, tap } from 'rxjs';

import { ThreadsService } from '../threads/threads.service';

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
    return this.http
      .post(`${this.url}`, { postId: threadId })
      .pipe(exhaustMap(() => this.revalidateThreads(threadId, 'increase')));
  }

  remove(threadId: string) {
    return this.http
      .delete(`${this.url}/${threadId}`)
      .pipe(exhaustMap(() => this.revalidateThreads(threadId, 'decrease')));
  }

  private revalidateThreads(threadId: string, status: 'increase' | 'decrease') {
    return this.threadsService.threads.pipe(
      take(1),
      tap((oldThreads) => {
        const newThreads = oldThreads.map((thread) => {
          if (thread.id === threadId) {
            const newLikesCount =
              status === 'increase'
                ? thread.likesCount + 1
                : thread.likesCount - 1;

            return {
              ...thread,
              userHasLiked: !thread.userHasLiked,
              likesCount: newLikesCount,
            };
          }
          return thread;
        });

        this.threadsService.threads.next(newThreads);
      }),
    );
  }
}
