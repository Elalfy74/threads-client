import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, take, tap } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { NewThread, Thread } from './interfaces';
import { NewReply } from '../replies/interfaces';

@Injectable({ providedIn: 'root' })
export class ThreadsService {
  threads = new BehaviorSubject<Thread[]>([]);
  private url = 'posts';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  find() {
    return this.http.get<Thread[]>(`${this.url}`).pipe(
      tap((resData) => {
        this.threads.next(resData);
      }),
    );
  }

  findOne(threadId: string) {
    return this.http.get<Thread>(`${this.url}/${threadId}`);
  }

  create(formData: FormData) {
    return this.http.post<NewThread>(`${this.url}`, formData).pipe(
      tap((newThread) =>
        this.localModify({
          action: Actions.THREAD_CREATED,
          payload: {
            newThread,
          },
        }),
      ),
    );
  }

  localModify(data: ActionData) {
    this.threads.pipe(take(1)).subscribe((oldThreads) => {
      let newThreads: Thread[] | undefined;

      switch (data.action) {
        case Actions.LIKE_CREATED:
        case Actions.LIKE_REMOVED:
          newThreads = this.localModifyLike(data, oldThreads);
          break;
        case Actions.REPLY_CREATED:
          newThreads = this.localModifyReply(data, oldThreads);
          break;
        case Actions.THREAD_CREATED:
          this.localCreateThread(data.payload.newThread);
          break;
        case Actions.THREAD_CREATED_DONE:
          newThreads = [data.payload.newThread, ...oldThreads];
          break;
      }

      if (newThreads) {
        this.threads.next(newThreads);
      }
    });
    if (data.action === Actions.REPLY_CREATED) {
      return data.payload.reply;
    }
    return null;
  }

  private localModifyLike(data: LIKE_MODIFIED_DATA, oldThreads: Thread[]) {
    return oldThreads.map((thread) => {
      if (thread.id === data.payload.threadId) {
        const newLikesCount =
          data.action === Actions.LIKE_CREATED
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

  private localModifyReply(data: REPLY_CREATED_DATA, oldThreads: Thread[]) {
    return oldThreads.map((thread) => {
      if (thread.id === data.payload.threadId) {
        return { ...thread, repliesCount: thread.repliesCount + 1 };
      }
      return thread;
    });
  }

  private localCreateThread(newThread: NewThread) {
    this.authService.currentUser
      .pipe(
        take(1),
        map((user) => {
          if (!user) return;

          return new Thread(
            newThread.id,
            newThread.content,
            newThread.createdAt,
            newThread.imageUrl,
            {
              username: user.user.username,
              avatar: user.user.avatar,
            },
          );
        }),
      )
      .subscribe((newThread) =>
        this.localModify({
          action: Actions.THREAD_CREATED_DONE,
          payload: { newThread: newThread! },
        }),
      );
  }
}

export enum Actions {
  LIKE_CREATED = 'LIKE_CREATED',
  LIKE_REMOVED = 'LIKE_REMOVED',
  REPLY_CREATED = 'REPLY_CREATED',
  THREAD_CREATED = 'THREAD_CREATED',
  THREAD_CREATED_DONE = 'THREAD_CREATED_DONE',
}

type LIKE_MODIFIED_DATA = {
  action: Actions.LIKE_CREATED | Actions.LIKE_REMOVED;
  payload: { threadId: string };
};

type REPLY_CREATED_DATA = {
  action: Actions.REPLY_CREATED;
  payload: {
    threadId: string;
    reply: NewReply;
  };
};

type THREAD_CREATED_DATA = {
  action: Actions.THREAD_CREATED;
  payload: {
    newThread: NewThread;
  };
};

type THREAD_CREATED_DONE_DATA = {
  action: Actions.THREAD_CREATED_DONE;
  payload: {
    newThread: Thread;
  };
};

type ActionData =
  | LIKE_MODIFIED_DATA
  | REPLY_CREATED_DATA
  | THREAD_CREATED_DATA
  | THREAD_CREATED_DONE_DATA;
