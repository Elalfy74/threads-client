import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AsideNavComponent } from './aside-nav/aside-nav.component';

@Component({
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [AsideNavComponent, RouterModule],
})
export class LayoutComponent {}
