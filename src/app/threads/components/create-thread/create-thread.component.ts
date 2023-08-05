import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Store, ActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';

import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

import { ThreadsState } from '../../store/threads.reducer';
import { addThreadStart, addThreadSuccess } from '../../store/threads.actions';
import { selectAddStatus } from '../../store/threads.selectors';

@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
})
export class CreateThreadComponent implements OnInit, OnDestroy {
  @Input() username?: string;
  @Input() avatar?: string;

  isLoading$ = this.store.select(selectAddStatus);

  addThreadSub = new Subscription();

  content = '';
  previewImg = '';
  imgFile?: File;
  fileExceedError?: boolean;

  constructor(
    private store: Store<{ threads: ThreadsState }>,
    private actionsSubj: ActionsSubject,
  ) {}

  ngOnInit(): void {
    this.addThreadSub = this.actionsSubj
      .pipe(ofType(addThreadSuccess))
      .subscribe(() => {
        this.content = '';
        this.imgFile = undefined;
        this.previewImg = '';
      });
  }

  ngOnDestroy(): void {
    this.addThreadSub.unsubscribe();
  }

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
    const formData = new FormData();

    formData.append('content', this.content);

    if (this.imgFile) {
      formData.append('file', this.imgFile);
    }

    this.store.dispatch(addThreadStart({ data: formData }));
  }
}
