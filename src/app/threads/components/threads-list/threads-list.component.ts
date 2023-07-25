import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThreadsService } from '../../threads.service';
import { Subscription } from 'rxjs';
import { Thread } from '../../interfaces';
import { LikesService } from 'src/app/likes/likes.service';

@Component({
  selector: 'app-threads-list',
  templateUrl: './threads-list.component.html',
})
export class ThreadsListComponent implements OnInit, OnDestroy {
  threads: Thread[] = [];
  threadsSub?: Subscription;

  constructor(
    private threadsService: ThreadsService,
    private likesService: LikesService,
  ) {}

  ngOnInit(): void {
    this.threadsService.getThreads();

    this.threadsSub = this.threadsService.threads.subscribe((resData) => {
      this.threads = [...resData, ...this.threads];
    });
  }

  ngOnDestroy(): void {
    this.threadsSub?.unsubscribe();
  }

  handleLike({ id, userHasLiked }: Thread) {
    if (!userHasLiked) {
      this.likesService.create(id);
    } else {
      this.likesService.remove(id);
    }
  }
}
