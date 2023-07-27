import { Component, Input } from '@angular/core';
import { Reply } from '../../interfaces/reply.interface';

@Component({
  selector: 'app-replies-list',
  templateUrl: './replies-list.component.html',
})
export class RepliesListComponent {
  @Input() replies!: Reply[];
}
