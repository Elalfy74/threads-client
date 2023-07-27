import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent {
  @Input() color: 'black' | 'white' = 'white';
  @Input() size: 'small' | 'normal' = 'small';
}
