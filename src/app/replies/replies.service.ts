import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take, tap } from 'rxjs';

import { ThreadsService } from '../threads/threads.service';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  private readonly url = 'replies';

  constructor(
    private http: HttpClient,
    private threadsService: ThreadsService,
  ) {}

  create(threadId: string, content: string) {
    return this.http
      .post(`${this.url}`, { postId: threadId, content })
      .pipe(exhaustMap(() => this.revalidateThreads(threadId)))
      .subscribe();
  }

  find(threadId: string) {
    return this.http.get(`${this.url}/${threadId}`);
  }

  private revalidateThreads(threadId: string) {
    return this.threadsService.threads.pipe(
      take(1),
      tap((oldThreads) => {
        const newThreads = oldThreads.map((thread) => {
          if (thread.id === threadId) {
            return { ...thread, commentsCount: thread.repliesCount + 1 };
          }
          return thread;
        });

        this.threadsService.threads.next(newThreads);
      }),
    );
  }
}
