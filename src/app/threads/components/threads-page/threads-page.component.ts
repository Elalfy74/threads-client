import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { CurrentUser } from 'src/app/auth/interfaces';
import { CreateThreadComponent } from '../create-thread/create-thread.component';
import { ThreadsListComponent } from '../threads-list/threads-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-threads-page',
  templateUrl: './threads-page.component.html',
  standalone: true,
  imports: [CommonModule, CreateThreadComponent, ThreadsListComponent],
})
export class ThreadsPageComponent implements OnInit, OnDestroy {
  currentUser?: CurrentUser['user'];
  currentUserSub?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUserSub = this.authService.currentUser.subscribe((user) => {
      this.currentUser = user?.user;
    });
  }

  ngOnDestroy(): void {
    this.currentUserSub?.unsubscribe();
  }
}
