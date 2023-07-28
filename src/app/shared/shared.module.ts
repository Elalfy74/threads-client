import { NgModule } from '@angular/core';

import { ModalComponent } from './modal/modal.component';
import { SpinnerComponent } from './spinner/spinner.component';

import { TimeAgoPipe } from './time-ago.pipe';

@NgModule({
  imports: [ModalComponent, SpinnerComponent, TimeAgoPipe],
  exports: [ModalComponent, SpinnerComponent, TimeAgoPipe],
})
export class SharedModule {}
