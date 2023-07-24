import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThreadsService } from '../../threads.service';
import { Subscription } from 'rxjs';
import { Thread } from '../../interfaces';

@Component({
  selector: 'app-threads-list',
  templateUrl: './threads-list.component.html',
})
export class ThreadsListComponent implements OnInit, OnDestroy {
  constructor(private threadsService: ThreadsService) {}
  threads: Thread[] = [];
  threadsSub?: Subscription;

  ngOnInit(): void {
    this.threadsService.getThreads();

    this.threadsSub = this.threadsService.threads.subscribe((resData) => {
      this.threads = [...resData, ...this.threads];
    });
  }

  ngOnDestroy(): void {
    this.threadsSub?.unsubscribe();
  }
}
