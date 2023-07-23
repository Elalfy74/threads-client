import { Component, ElementRef } from '@angular/core';
import { ThreadsService } from '../../threads.service';

@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
})
export class CreateThreadComponent {
  constructor(private threadsService: ThreadsService) {}

  content = '';

  onAddThread() {
    this.threadsService.addThread(this.content);
    this.content = '';
  }

  onInput(e: Event) {
    this.content = (e.target as HTMLInputElement).textContent!;
  }
}
