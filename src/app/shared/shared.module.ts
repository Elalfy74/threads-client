import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './modal/modal.component';
import { SpinnerComponent } from './spinner/spinner.component';

import { TimeAgoPipe } from './time-ago.pipe';

@NgModule({
  declarations: [ModalComponent, SpinnerComponent, TimeAgoPipe],
  imports: [CommonModule],
  exports: [ModalComponent, SpinnerComponent, TimeAgoPipe],
})
export class SharedModule {}
