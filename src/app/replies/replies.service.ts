import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';

import { ThreadsService } from '../threads/threads.service';
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
      .pipe(exhaustMap((reply) => this.revalidateThreads(threadId, reply)));
  }

  find(threadId: string) {
    return this.http.get(`${this.url}/${threadId}`);
  }

  private revalidateThreads(threadId: string, reply: NewReply) {
    return this.threadsService.threads.pipe(
      take(1),

      map((oldThreads) => {
        const newThreads = oldThreads.map((thread) => {
          if (thread.id === threadId) {
            return { ...thread, repliesCount: thread.repliesCount + 1 };
          }
          return thread;
        });

        this.threadsService.threads.next(newThreads);
        return reply;
      }),
    );
  }
}
