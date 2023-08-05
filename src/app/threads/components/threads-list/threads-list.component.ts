import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { ThreadItemComponent } from '../thread-item/thread-item.component';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

import { LikesService } from 'src/app/likes/likes.service';

import { CurrentUser } from 'src/app/auth/interfaces';
import { Thread } from '../../interfaces';

import {
  selectAllThreads,
  selectLoadStatus,
} from '../../store/threads.selectors';
import { ThreadsState } from '../../store/threads.reducer';
import {
  appendThreadsStart,
  loadThreadsStart,
} from '../../store/threads.actions';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-threads-list',
  templateUrl: './threads-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    InfiniteScrollModule,
    ThreadItemComponent,
    SpinnerComponent,
  ],
})
export class ThreadsListComponent implements OnChanges {
  page = 1;
  itemsPerPage = 10;

  @Input() currentUser?: CurrentUser['user'];

  public threads$ = this.store.select(selectAllThreads);
  public isLoading$ = this.store.select(selectLoadStatus);

  constructor(
    private store: Store<{ threads: ThreadsState }>,
    private likesService: LikesService,
  ) {}

  ngOnChanges(): void {
    this.store.dispatch(loadThreadsStart());
  }

  onScroll = () => {
    this.page++;
    this.store.dispatch(
      appendThreadsStart({ page: this.page, itemsPerPage: this.itemsPerPage }),
    );
  };

  handleLike({ id, userHasLiked }: Thread) {
    if (!userHasLiked) {
      this.likesService.create(id).subscribe();
    } else {
      this.likesService.remove(id).subscribe();
    }
  }
}
