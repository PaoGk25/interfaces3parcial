import { Injectable } from '@angular/core';
import { Rol, Sesion, Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly CLAVE = 'sesion-inventario';

  // Usuarios simulados (para la demo). En un sistema real se validaría contra un backend.
  private readonly USUARIOS: Usuario[] = [
    { usuario: 'admin', clave: 'admin123', nombre: 'Administrador', rol: Rol.Admin },
    { usuario: 'trabajador', clave: 'trabajador123', nombre: 'Trabajador', rol: Rol.Trabajador },
  ];

  login(usuario: string, clave: string): boolean {
    const encontrado = this.USUARIOS.find(u => u.usuario === usuario.trim() && u.clave === clave);
    if (!encontrado) {
      return false;
    }
    const sesion: Sesion = { usuario: encontrado.usuario, nombre: encontrado.nombre, rol: encontrado.rol };
    sessionStorage.setItem(this.CLAVE, JSON.stringify(sesion));
    return true;
  }

  logout(): void {
    sessionStorage.removeItem(this.CLAVE);
  }

  // Lee la sesión guardada; si no existe o está dañada devuelve null
  sesionActual(): Sesion | null {
    const datos = sessionStorage.getItem(this.CLAVE);
    if (!datos) return null;
    try {
      const sesion = JSON.parse(datos) as Sesion;
      return Object.values(Rol).includes(sesion.rol) ? sesion : null;
    } catch {
      return null;
    }
  }

  estaAutenticado(): boolean {
    return this.sesionActual() !== null;
  }

  rolActual(): Rol | null {
    return this.sesionActual()?.rol ?? null;
  }

  esAdmin(): boolean {
    return this.rolActual() === Rol.Admin;
  }

  // ¿El rol del usuario actual está dentro de los roles permitidos?
  tieneRol(roles: Rol[]): boolean {
    const rol = this.rolActual();
    return rol !== null && roles.includes(rol);
  }
}
