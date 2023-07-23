import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { RegisterDto } from '../../interfaces';

@Component({
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  register(dto: RegisterDto) {
    this.authService.register(dto);
  }
}
