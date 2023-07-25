import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.post(`${this.url}`, { postId: threadId }).subscribe(() => {
      this.threadsService.getThreads();
    });
  }

  remove(threadId: string) {
    return this.http.delete(`${this.url}/${threadId}`).subscribe(() => {
      this.threadsService.getThreads();
    });
  }
}
