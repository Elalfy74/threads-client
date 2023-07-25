import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ThreadsService } from '../../threads.service';
import { Subscription } from 'rxjs';
import { Thread } from '../../interfaces';
import { LikesService } from 'src/app/likes/likes.service';
import { CurrentUser } from 'src/app/auth/interfaces';

@Component({
  selector: 'app-threads-list',
  templateUrl: './threads-list.component.html',
})
export class ThreadsListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() currentUser!: CurrentUser['user'] | null;
  threads: Thread[] = [];
  threadsSub?: Subscription;

  constructor(
    private threadsService: ThreadsService,
    private likesService: LikesService,
  ) {}

  ngOnInit(): void {
    this.threadsSub = this.threadsService.threads.subscribe((resData) => {
      this.threads = resData;
    });
  }

  ngOnDestroy(): void {
    this.threadsSub?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.threadsService.find();
  }

  handleLike({ id, userHasLiked }: Thread) {
    if (!userHasLiked) {
      this.likesService.create(id);
    } else {
      this.likesService.remove(id);
    }
  }
}
