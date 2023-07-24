import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ThreadsPageComponent } from './threads/components/threads-page/threads-page.component';
import { authGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { LayoutComponent } from './layout/layout.component';

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
