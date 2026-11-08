// Enum: los dos roles que existen en el sistema
export enum Rol {
  Admin = 'ADMIN',
  Trabajador = 'TRABAJADOR',
}

// Usuario "registrado" en el sistema (simulado)
export interface Usuario {
  usuario: string;
  clave: string;
  nombre: string;
  rol: Rol;
}

// Lo que guardamos al iniciar sesión (nunca guardamos la contraseña)
export interface Sesion {
  usuario: string;
  nombre: string;
  rol: Rol;
}
