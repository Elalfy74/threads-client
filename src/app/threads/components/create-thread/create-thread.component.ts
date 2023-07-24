import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ThreadsService } from '../../threads.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
})
export class CreateThreadComponent {
  @Input() username!: string;
  @Input() avatar!: string;

  content = '';
  previewImg = '';
  imgFile?: File;

  constructor(private threadsService: ThreadsService) {}

  onAddThread() {
    this.threadsService
      .addThread({
        content: this.content,
        imgFile: this.imgFile,
      })
      .subscribe(() => {
        this.content = '';
        this.imgFile = undefined;
        this.previewImg = '';
      });
  }

  onInput(e: Event) {
    this.content = (e.target as HTMLInputElement).textContent!;
  }

  onAddFile(ele?: any) {
    if (ele && ele.files) {
      this.imgFile = ele.files[0];
      this.previewImg = URL.createObjectURL(ele.files[0]);
    }
  }
}
