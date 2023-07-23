import { Component, OnInit } from '@angular/core';
import { Thread } from '../../thread.model';
import { ThreadsService } from '../../threads.service';

@Component({
  selector: 'app-threads-list',
  templateUrl: './threads-list.component.html',
})
export class ThreadsListComponent implements OnInit {
  constructor(private threadsService: ThreadsService) {}
  threads: Thread[] = [];

  ngOnInit(): void {
    this.threads = this.threadsService.threads;
  }
}
