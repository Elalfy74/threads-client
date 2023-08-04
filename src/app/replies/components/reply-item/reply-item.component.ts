import { Component, Input } from '@angular/core';

import { TimeAgoPipe } from 'src/app/shared/time-ago.pipe';

import { Reply } from '../../interfaces/reply.interface';

@Component({
  selector: 'app-reply-item',
  templateUrl: './reply-item.component.html',
  standalone: true,
  imports: [TimeAgoPipe],
})
export class ReplyItemComponent {
  @Input() reply!: Reply;
}
