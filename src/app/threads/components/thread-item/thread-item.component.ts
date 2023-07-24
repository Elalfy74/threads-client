import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Thread } from '../../interfaces';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-thread-item',
  templateUrl: './thread-item.component.html',
})
export class ThreadItemComponent implements OnInit, OnDestroy {
  @Input() thread!: Thread;
  @Output() handleLike = new EventEmitter();

  isAuth = false;
  currentUserSub?: Subscription;

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
