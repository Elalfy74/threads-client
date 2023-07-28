import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class SpinnerComponent {
  @Input() color: 'black' | 'white' = 'white';
  @Input() size: 'small' | 'normal' = 'small';
}
