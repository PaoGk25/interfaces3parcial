import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  menuAbierto = false;

  constructor(public auth: AuthService, private router: Router) {}

  salir(): void {
    this.auth.logout();
    this.menuAbierto = false;
    this.router.navigate(['/login']);
  }
}
