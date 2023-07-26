import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { Thread } from '../../interfaces';

@Component({
  selector: 'app-thread-item',
  templateUrl: './thread-item.component.html',
})
export class ThreadItemComponent implements OnInit, OnDestroy {
  @Input() thread!: Thread;
  @Output() handleLike = new EventEmitter();

  isAuth = false;
  currentUserSub?: Subscription;
  isModalVisible: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUserSub = this.authService.currentUser.subscribe((user) => {
      this.isAuth = !!user;
    });
  }

  ngOnDestroy(): void {
    this.currentUserSub?.unsubscribe();
  }

  onLike() {
    if (!this.isAuth) return;

    this.handleLike.emit(this.thread);
  }
}
