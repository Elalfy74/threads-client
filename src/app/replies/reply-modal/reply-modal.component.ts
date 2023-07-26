import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Thread } from 'src/app/threads/interfaces';

@Component({
  selector: 'app-reply-modal',
  templateUrl: './reply-modal.component.html',
})
export class ReplyModalComponent {
  @Input() isVisible!: boolean;
  @Input() thread!: Thread;

  @Output() close = new EventEmitter();

  onClose() {
    this.close.emit();
  }
}
