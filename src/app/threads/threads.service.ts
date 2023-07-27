import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { CreateThreadDto, CreatedThread, Thread } from './interfaces';
import { BehaviorSubject, exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
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

    return this.http.post<CreatedThread>(`${this.url}`, formData).pipe(
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
}
