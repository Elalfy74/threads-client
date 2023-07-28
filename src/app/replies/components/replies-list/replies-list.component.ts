import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReplyItemComponent } from '../reply-item/reply-item.component';

import { Reply } from '../../interfaces/reply.interface';

@Component({
  selector: 'app-replies-list',
  templateUrl: './replies-list.component.html',
  standalone: true,
  imports: [CommonModule, ReplyItemComponent],
})
export class RepliesListComponent {
  @Input() replies!: Reply[];
}
