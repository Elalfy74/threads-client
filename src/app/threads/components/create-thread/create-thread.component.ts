import { Component, Input } from '@angular/core';
import { ThreadsService } from '../../threads.service';

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

  onInput(e: Event) {
    this.content = (e.target as HTMLInputElement).textContent!;
  }

  onAddFile(ele?: any) {
    if (ele && ele.files) {
      this.imgFile = ele.files[0];
      this.previewImg = URL.createObjectURL(ele.files[0]);
    }
  }

  onAddThread() {
    this.threadsService
      .create({
        content: this.content,
        imgFile: this.imgFile,
      })
      .subscribe(() => {
        this.content = '';
        this.imgFile = undefined;
        this.previewImg = '';
      });
  }
}
