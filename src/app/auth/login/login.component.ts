import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  error = false;
  verClave = false; // false = contraseña oculta

  form = this.fb.nonNullable.group({
    usuario: ['', Validators.required],
    clave: ['', [Validators.required, Validators.minLength(4)]],
  });

  ingresar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { usuario, clave } = this.form.getRawValue();
    if (this.auth.login(usuario, clave)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = true;
    }
  }
}
