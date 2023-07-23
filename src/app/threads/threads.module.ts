import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreadsListComponent } from './components/threads-list/threads-list.component';
import { ThreadItemComponent } from './components/thread-item/thread-item.component';
import { ThreadsService } from './threads.service';
import { SharedModule } from '../shared/shared.module';
import { ThreadActionsComponent } from './components/thread-item/thread-actions/thread-actions.component';
import { CreateThreadComponent } from './components/create-thread/create-thread.component';
import { ThreadsPageComponent } from './components/threads-page/threads-page.component';

@NgModule({
  declarations: [
    ThreadsListComponent,
    ThreadItemComponent,
    ThreadActionsComponent,
    CreateThreadComponent,
    ThreadsPageComponent,
  ],
  providers: [ThreadsService],
  imports: [CommonModule, SharedModule],
})
export class ThreadsModule {}
