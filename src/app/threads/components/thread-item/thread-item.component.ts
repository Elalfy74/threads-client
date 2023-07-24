import { Component, Input } from '@angular/core';
import { Thread } from '../../interfaces';

@Component({
  selector: 'app-thread-item',
  templateUrl: './thread-item.component.html',
})
export class ThreadItemComponent {
  @Input()
  thread!: Thread;
}
