import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Thread } from '../../interfaces';
import { ThreadWithReplies } from '../../interfaces/thread-with-replies.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thread-item',
  templateUrl: './thread-item.component.html',
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
