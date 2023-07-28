import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RepliesService } from '../../replies.service';
import { Thread } from 'src/app/threads/interfaces';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { TimeAgoPipe } from 'src/app/shared/time-ago.pipe';

@Component({
  selector: 'app-reply-modal',
  templateUrl: './reply-modal.component.html',
  standalone: true,
  imports: [CommonModule, ModalComponent, SpinnerComponent, TimeAgoPipe],
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
