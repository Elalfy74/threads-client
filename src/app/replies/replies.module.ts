import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { RepliesListComponent } from './components/replies-list/replies-list.component';
import { ReplyItemComponent } from './components/reply-item/reply-item.component';
import { ReplyModalComponent } from './components/reply-modal/reply-modal.component';

@NgModule({
  declarations: [RepliesListComponent, ReplyItemComponent, ReplyModalComponent],
  exports: [RepliesListComponent, ReplyModalComponent],
  imports: [CommonModule, SharedModule],
})
export class RepliesModule {}
