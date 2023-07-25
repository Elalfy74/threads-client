import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
})
export class AsideNavComponent implements OnInit, OnDestroy {
  isAuth = false;
  authSub?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.currentUser.subscribe((user) => {
      this.isAuth = !!user;
    });
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  onLogin() {
    this.router.navigate(['/auth']);
  }
}
