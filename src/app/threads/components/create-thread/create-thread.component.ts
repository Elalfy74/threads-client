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
  fileExceedError?: boolean;
  isLoading = false;

  constructor(private threadsService: ThreadsService) {}

  onInput(e: Event) {
    this.content = (e.target as HTMLInputElement).textContent!;
  }

  onAddFile(ele?: any) {
    this.fileExceedError = false;

    if (ele && ele.files) {
      const { size }: File = ele.files[0];

      // 2MB
      if (size > 2097152) {
        this.fileExceedError = true;
        return;
      }

      this.imgFile = ele.files[0];
      this.previewImg = URL.createObjectURL(ele.files[0]);
    }
  }

  onAddThread() {
    this.isLoading = true;

    this.threadsService
      .create({
        content: this.content,
        imgFile: this.imgFile,
      })
      .subscribe(() => {
        this.content = '';
        this.imgFile = undefined;
        this.previewImg = '';
        this.isLoading = false;
      });
  }
}
