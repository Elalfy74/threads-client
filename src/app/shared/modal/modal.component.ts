import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  standalone: true,
  imports: [CommonModule],

  animations: [
    trigger('bg', [
      state(
        'in',
        style({
          opacity: 1,
        }),
      ),
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate(300),
      ]),
      transition('* => void', [
        animate(
          300,
          style({
            opacity: 0,
          }),
        ),
      ]),
    ]),
    trigger('content', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        }),
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(50px)',
        }),
        animate(300),
      ]),
      transition('* => void', [
        animate(
          300,
          style({
            opacity: 0,
            transform: 'translateY(50px)',
          }),
        ),
      ]),
    ]),
  ],
})
export class ModalComponent {
  @Input() isVisible!: boolean;
  @Output() close = new EventEmitter();
}
