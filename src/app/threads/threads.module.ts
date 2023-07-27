import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ThreadsListComponent } from './components/threads-list/threads-list.component';
import { ThreadItemComponent } from './components/thread-item/thread-item.component';
import { ThreadsService } from './threads.service';
import { SharedModule } from '../shared/shared.module';
import { CreateThreadComponent } from './components/create-thread/create-thread.component';
import { ThreadsPageComponent } from './components/threads-page/threads-page.component';
import { ReplyModalComponent } from '../replies/reply-modal/reply-modal.component';
import { ThreadDetailsPageComponent } from './components/thread-details-page/thread-details-page.component';

@NgModule({
  declarations: [
    ThreadsListComponent,
    ThreadItemComponent,
    CreateThreadComponent,
    ThreadsPageComponent,
    ReplyModalComponent,
    ThreadDetailsPageComponent,
  ],
  providers: [ThreadsService],

  imports: [CommonModule, SharedModule, RouterModule],
})
export class ThreadsModule {}
