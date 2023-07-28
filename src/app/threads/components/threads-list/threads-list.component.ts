import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { LikesService } from 'src/app/likes/likes.service';
import { CurrentUser } from 'src/app/auth/interfaces';

import { ThreadsService } from '../../threads.service';
import { Thread } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { ThreadItemComponent } from '../thread-item/thread-item.component';

@Component({
  selector: 'app-threads-list',
  templateUrl: './threads-list.component.html',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, ThreadItemComponent],
})
export class ThreadsListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() currentUser?: CurrentUser['user'];
  threads: Thread[] = [];
  threadsSub?: Subscription;
  isLoading = false;

  constructor(
    private threadsService: ThreadsService,
    private likesService: LikesService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.threadsService.find().subscribe(() => {
      this.isLoading = false;
    });

    this.threadsSub = this.threadsService.threads.subscribe((resData) => {
      this.threads = resData;
    });
  }

  ngOnDestroy(): void {
    this.threadsSub?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.threads.length > 0) {
      this.threadsService.find().subscribe(() => {});
    }
  }

  handleLike({ id, userHasLiked }: Thread) {
    if (!userHasLiked) {
      this.likesService.create(id).subscribe();
    } else {
      this.likesService.remove(id).subscribe();
    }
  }
}
