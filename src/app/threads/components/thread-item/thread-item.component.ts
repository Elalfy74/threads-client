import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { Thread, ThreadWithReplies } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { ReplyModalComponent } from 'src/app/replies/components/reply-modal/reply-modal.component';
import { TimeAgoPipe } from 'src/app/shared/time-ago.pipe';

@Component({
  selector: 'app-thread-item',
  templateUrl: './thread-item.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, ReplyModalComponent, TimeAgoPipe],
})
export class ThreadItemComponent {
  @Input() thread!: Thread | ThreadWithReplies;
  @Input() isAuth = false;
  @Input() shouldNavigate = false;
  @Output() handleLike = new EventEmitter();
  @Output() onReplySuccess = new EventEmitter();

  isModalVisible: boolean = false;

  constructor(private router: Router) {}

  onLike(e: Event) {
    e.stopPropagation();

    if (!this.isAuth) return;
    this.handleLike.emit(this.thread);
  }

  onThreadClick() {
    if (this.shouldNavigate) {
      this.router.navigate(['threads', this.thread.id]);
    }
  }

  onShowModal(e: Event) {
    e.stopPropagation();
    this.isModalVisible = true;
  }
}
