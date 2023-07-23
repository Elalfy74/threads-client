import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from './auth.service';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  providers: [AuthService],
  imports: [RouterModule, FormsModule],
})
export class AuthModule {}
