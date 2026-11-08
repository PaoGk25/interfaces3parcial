import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Rol } from './models/usuario.model';
import { AuthService } from './services/auth.service';

// Guard: si no hay sesión, redirige a /login
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.estaAutenticado() ? true : router.createUrlTree(['/login']);
};

// Guard por rol: se usa así -> canActivate: [rolGuard([Rol.Admin])]
// Sin sesión va a /login; con sesión pero sin permiso vuelve al panel.
export const rolGuard = (rolesPermitidos: Rol[]): CanActivateFn => () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.estaAutenticado()) {
    return router.createUrlTree(['/login']);
  }
  return auth.tieneRol(rolesPermitidos) ? true : router.createUrlTree(['/dashboard']);
};
