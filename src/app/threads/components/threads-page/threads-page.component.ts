import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { CurrentUser } from 'src/app/auth/interfaces';

@Component({
  selector: 'app-threads-page',
  templateUrl: './threads-page.component.html',
})
export class ThreadsPageComponent implements OnInit, OnDestroy {
  currentUser: CurrentUser['user'] | null = null;
  currentUserSub?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUserSub = this.authService.currentUser.subscribe((user) => {
      this.currentUser = user?.user || null;
    });
  }

  ngOnDestroy(): void {
    this.currentUserSub?.unsubscribe();
  }
}
