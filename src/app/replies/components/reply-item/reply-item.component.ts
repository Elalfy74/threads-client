import { Component, Input } from '@angular/core';

import { Reply } from '../../interfaces/reply.interface';

@Component({
  selector: 'app-reply-item',
  templateUrl: './reply-item.component.html',
})
export class ReplyItemComponent {
  @Input() reply!: Reply;
}
