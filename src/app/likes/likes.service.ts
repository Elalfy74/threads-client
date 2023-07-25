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
      .pipe(exhaustMap(() => this.revalidateThreads(threadId)))
      .subscribe();
  }

  remove(threadId: string) {
    return this.http
      .delete(`${this.url}/${threadId}`)
      .pipe(exhaustMap(() => this.revalidateThreads(threadId)))
      .subscribe();
  }

  private revalidateThreads(threadId: string) {
    return this.threadsService.threads.pipe(
      take(1),
      tap((oldThreads) => {
        const newThreads = oldThreads.map((thread) => {
          if (thread.id === threadId) {
            return { ...thread, userHasLiked: !thread.userHasLiked };
          }
          return thread;
        });

        this.threadsService.threads.next(newThreads);
      }),
    );
  }
}
