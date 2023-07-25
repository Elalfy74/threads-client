import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { CreateThreadDto, CreatedThread, Thread } from './interfaces';
import { Subject, exhaustMap, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ThreadsService {
  threads = new Subject<Thread[]>();
  private url = 'posts';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getThreads() {
    return this.http.get<Thread[]>(`${this.url}`).subscribe((resData) => {
      this.threads.next(resData);
    });
  }

  addThread(dto: CreateThreadDto) {
    const formData = new FormData();
    formData.append('content', dto.content);

    if (dto.imgFile) {
      formData.append('file', dto.imgFile);
    }

    let resData: CreatedThread;

    return this.http.post<CreatedThread>(`${this.url}`, formData).pipe(
      exhaustMap((res) => {
        resData = res;
        return this.authService.currentUser;
      }),
      take(1),
      tap((user) => {
        if (!user) return;

        const newThread = new Thread(
          resData.id,
          resData.content,
          resData.createdAt,
          resData.imageUrl,
          {
            username: user?.user.username,
            avatar: user.user.avatar,
          },
        );

        this.threads.next([newThread]);
      }),
    );
  }
}
