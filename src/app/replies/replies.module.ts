import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepliesListComponent } from './components/replies-list/replies-list.component';
import { ReplyItemComponent } from './components/reply-item/reply-item.component';
import { ReplyModalComponent } from './components/reply-modal/reply-modal.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RepliesListComponent, ReplyItemComponent, ReplyModalComponent],
  exports: [ReplyModalComponent, RepliesListComponent],
  imports: [CommonModule, SharedModule],
})
export class RepliesModule {}
