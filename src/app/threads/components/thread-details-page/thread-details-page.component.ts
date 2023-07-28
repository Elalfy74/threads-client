import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { CurrentUser } from 'src/app/auth/interfaces';
import { LikesService } from 'src/app/likes/likes.service';
import { AuthService } from 'src/app/auth/auth.service';

import { ThreadWithReplies } from '../../interfaces/thread-with-replies.interface';
import { NewReply } from 'src/app/replies/interfaces';
import { ThreadItemComponent } from '../thread-item/thread-item.component';
import { RepliesListComponent } from 'src/app/replies/components/replies-list/replies-list.component';

@Component({
  templateUrl: './thread-details-page.component.html',
  standalone: true,
  imports: [ThreadItemComponent, RepliesListComponent],
})
export class ThreadDetailsPageComponent implements OnInit, OnDestroy {
  thread!: ThreadWithReplies;
  currentUser?: CurrentUser['user'];
  currentUserSub?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private likesService: LikesService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ thread }) => {
      this.thread = thread;
    });

    this.currentUserSub = this.authService.currentUser.subscribe((user) => {
      this.currentUser = user?.user;
    });
  }

  ngOnDestroy(): void {
    this.currentUserSub?.unsubscribe();
  }

  handleLike() {
    if (!this.thread) return;

    if (!this.thread.userHasLiked) {
      this.likesService.create(this.thread.id).subscribe(() => {
        this.thread.userHasLiked = true;
        this.thread.likesCount += 1;
      });
    } else {
      this.likesService.remove(this.thread.id).subscribe(() => {
        this.thread.userHasLiked = false;
        this.thread.likesCount -= 1;
      });
    }
  }

  onReplySuccess(reply: NewReply) {
    this.thread.repliesCount += 1;

    this.thread.replies.unshift({
      ...reply,
      user: {
        username: this.currentUser!.username,
        avatar: this.currentUser!.avatar,
      },
    });
  }
}
