import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AsideNavComponent } from './aside-nav/aside-nav.component';

@Component({
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [RouterModule, AsideNavComponent],
})
export class LayoutComponent {}
