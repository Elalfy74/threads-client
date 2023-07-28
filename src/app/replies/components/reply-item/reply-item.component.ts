import { Component, Input } from '@angular/core';

import { Reply } from '../../interfaces/reply.interface';
import { TimeAgoPipe } from 'src/app/shared/time-ago.pipe';

@Component({
  selector: 'app-reply-item',
  templateUrl: './reply-item.component.html',
  standalone: true,
  imports: [TimeAgoPipe],
})
export class ReplyItemComponent {
  @Input() reply!: Reply;
}
