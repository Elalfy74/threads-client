import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NewThread, Thread } from './interfaces';
import { CurrentUser } from '../auth/interfaces';

import { removeLikeFromThread, addLikeToThread } from './store/threads.actions';

@Injectable({ providedIn: 'root' })
export class ThreadsService {
  private url = 'posts';

  constructor(private http: HttpClient) {}

  find(page: number = 1, itemsPerPage: number = 10) {
    return this.http.get<Thread[]>(`${this.url}`, {
      params: {
        page,
        itemsPerPage,
      },
    });
  }

  findOne(threadId: string) {
    return this.http.get<Thread>(`${this.url}/${threadId}`);
  }

  create(formData: FormData) {
    return this.http.post<NewThread>(`${this.url}`, formData);
  }

  localCreateThread(newThread: NewThread, user: CurrentUser['user']) {
    return new Thread(
      newThread.id,
      newThread.content,
      newThread.createdAt,
      newThread.imageUrl,
      {
        username: user.username,
        avatar: user.avatar,
      },
    );
  }

  localModifyLike(data: LIKE_MODIFIED_DATA, oldThreads: Thread[]) {
    return oldThreads.map((thread) => {
      if (thread.id === data.payload.threadId) {
        const newLikesCount =
          data.action === addLikeToThread['type']
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
  }

  localModifyReply(threadId: string, oldThreads: Thread[]) {
    return oldThreads.map((thread) => {
      if (thread.id === threadId) {
        return { ...thread, repliesCount: thread.repliesCount + 1 };
      }
      return thread;
    });
  }
}

type LIKE_MODIFIED_DATA = {
  action:
    | (typeof addLikeToThread)['type']
    | (typeof removeLikeFromThread)['type'];
  payload: { threadId: string };
};
