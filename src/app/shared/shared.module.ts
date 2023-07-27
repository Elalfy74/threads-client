import { NgModule } from '@angular/core';
import { TimeAgoPipe } from './time-ago.pipe';
import { ModalComponent } from './modal/modal.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [TimeAgoPipe, ModalComponent, SpinnerComponent],
  imports: [CommonModule],
  exports: [TimeAgoPipe, ModalComponent, SpinnerComponent],
})
export class SharedModule {}
