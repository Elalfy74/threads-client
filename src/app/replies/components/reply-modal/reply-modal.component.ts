import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RepliesService } from '../../replies.service';
import { Thread } from 'src/app/threads/interfaces';

@Component({
  selector: 'app-reply-modal',
  templateUrl: './reply-modal.component.html',
})
export class ReplyModalComponent {
  @Input() isVisible!: boolean;
  @Input() thread!: Thread;
  @Output() close = new EventEmitter();
  @Output() onReplySuccess = new EventEmitter();

  content = '';
  isLoading = false;

  constructor(private repliesService: RepliesService) {}

  onInput(e: Event) {
    this.content = (e.target as HTMLInputElement).textContent!;
  }

  onReply() {
    this.isLoading = true;

    this.repliesService
      .create(this.thread.id, this.content)
      .subscribe((replyRes) => {
        this.content = '';
        this.isLoading = false;

        this.onReplySuccess.emit(replyRes);
        this.close.emit();
      });
  }
}
