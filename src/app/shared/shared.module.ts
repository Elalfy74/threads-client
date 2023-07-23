import { NgModule, Type } from '@angular/core';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

@NgModule({
  declarations: [TimeAgoPipe],
  exports: [TimeAgoPipe],
})
export class SharedModule {}
