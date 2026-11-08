import { Rol } from '../models/usuario.model';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const servicio = new AuthService();
  afterEach(() => servicio.logout());

  it('acepta credenciales correctas', () => {
    expect(servicio.login('admin', 'admin123')).toBeTruthy();
    expect(servicio.estaAutenticado()).toBeTruthy();
  });

  it('rechaza credenciales incorrectas', () => {
    expect(servicio.login('admin', 'mal')).toBeFalsy();
    expect(servicio.estaAutenticado()).toBeFalsy();
  });

  it('el admin tiene rol ADMIN y permisos de administrador', () => {
    servicio.login('admin', 'admin123');
    expect(servicio.rolActual()).toBe(Rol.Admin);
    expect(servicio.esAdmin()).toBeTruthy();
  });

  it('el trabajador tiene rol TRABAJADOR y no es admin', () => {
    expect(servicio.login('trabajador', 'trabajador123')).toBeTruthy();
    expect(servicio.rolActual()).toBe(Rol.Trabajador);
    expect(servicio.esAdmin()).toBeFalsy();
    expect(servicio.tieneRol([Rol.Admin])).toBeFalsy();
    expect(servicio.tieneRol([Rol.Admin, Rol.Trabajador])).toBeTruthy();
  });

  it('al cerrar sesión ya no hay rol', () => {
    servicio.login('admin', 'admin123');
    servicio.logout();
    expect(servicio.rolActual()).toBeNull();
  });
});
