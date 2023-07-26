import { NgModule } from '@angular/core';
import { TimeAgoPipe } from './time-ago.pipe';
import { ModalComponent } from './modal/modal.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TimeAgoPipe, ModalComponent],
  imports: [CommonModule],
  exports: [TimeAgoPipe, ModalComponent],
})
export class SharedModule {}
