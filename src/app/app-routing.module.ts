import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './auth/auth.guard';
import { threadResolver } from './threads/thread.resolver';

import { LayoutComponent } from './layout/layout.component';
import { ThreadsPageComponent } from './threads/components/threads-page/threads-page.component';
import { AuthComponent } from './auth/auth.component';
import { ThreadDetailsPageComponent } from './threads/components/thread-details-page/thread-details-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: ThreadsPageComponent,
        // canActivate: [authGuard()],
      },
      {
        path: 'threads/:threadId',
        component: ThreadDetailsPageComponent,
        resolve: { thread: threadResolver },
      },
    ],
  },

  {
    path: 'auth',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
