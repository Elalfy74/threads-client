import { Component, Input } from '@angular/core';

import { Reply } from '../../interfaces/reply.interface';
import { ReplyItemComponent } from '../reply-item/reply-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-replies-list',
  templateUrl: './replies-list.component.html',
  standalone: true,
  imports: [CommonModule, ReplyItemComponent],
})
export class RepliesListComponent {
  @Input() replies!: Reply[];
}
