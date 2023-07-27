import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, exhaustMap, map, take, tap } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { CreateThreadDto, NewThread, Thread } from './interfaces';
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

  create(dto: CreateThreadDto) {
    const formData = new FormData();
    formData.append('content', dto.content);

    if (dto.imgFile) {
      formData.append('file', dto.imgFile);
    }

    return this.http.post<NewThread>(`${this.url}`, formData).pipe(
      exhaustMap((resData) => {
        return this.authService.currentUser.pipe(
          (take(1),
          map((user) => {
            if (!user) return;

            return new Thread(
              resData.id,
              resData.content,
              resData.createdAt,
              resData.imageUrl,
              {
                username: user?.user.username,
                avatar: user.user.avatar,
              },
            );
          })),
        );
      }),

      exhaustMap((newThread) => {
        return this.threads.pipe(
          take(1),
          tap((oldThreads) => {
            this.threads.next([newThread!, ...oldThreads]);
          }),
        );
      }),
    );
  }

  localModify(data: ActionData) {
    return this.threads.pipe(
      take(1),
      tap((oldThreads) => {
        let newThreads: Thread[];

        switch (data.action) {
          case Actions.LIKE_CREATED:
          case Actions.LIKE_REMOVED:
            newThreads = this.localModifyLike(data, oldThreads);
            break;
          case Actions.REPLY_CREATED:
            newThreads = this.localModifyReply(data, oldThreads);
            break;
          default:
            return null;
        }
        this.threads.next(newThreads);

        if (data.action === Actions.REPLY_CREATED) {
          return data.payload.reply;
        }
        return null;
      }),
    );
  }

  private localModifyLike(data: ActionData, oldThreads: Thread[]) {
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

  private localModifyReply(data: ActionData, oldThreads: Thread[]) {
    return oldThreads.map((thread) => {
      if (thread.id === data.payload.threadId) {
        return { ...thread, repliesCount: thread.repliesCount + 1 };
      }
      return thread;
    });
  }
}

export enum Actions {
  LIKE_CREATED = 'LIKE_CREATED',
  LIKE_REMOVED = 'LIKE_REMOVED',
  REPLY_CREATED = 'REPLY_CREATED',
}

type ActionData =
  | {
      action: Actions.LIKE_CREATED | Actions.LIKE_REMOVED;
      payload: { threadId: string };
    }
  | {
      action: Actions.REPLY_CREATED;
      payload: {
        threadId: string;
        reply: NewReply;
      };
    };
