# Inventario Escolar (Angular + TypeScript)

## Integrantes
- Giorgio Alfaro
- Paolo Huamani

Aplicación web para digitalizar el control de inventario de una tienda que vende útiles de estudio y escolares. Reemplaza las hojas y cuadernos por un registro centralizado con stock actualizado, alertas, gestión de productos y control de acceso por roles (administrador y trabajador).

## Definición del problema
La tienda lleva su inventario en cuadernos y hojas de cálculo. Esto genera cinco problemas:
1. No se sabe el stock real.
2. Los productos se agotan sin aviso.
3. No hay historial de movimientos.
4. Se pueden registrar salidas mayores al stock.
5. Cualquier persona puede cambiar precios.

El diseño completo (usuarios, flujos y bocetos) está en [docs/DISENO.md](docs/DISENO.md).

## Funcionalidades
- **Inicio de sesión** como administrador o trabajador, con rutas protegidas mediante guards.
- **Productos:** registrar, listar, buscar, editar y eliminar (crear, editar y eliminar solo para el administrador).
- **Movimientos:** registrar entradas y salidas. El stock se actualiza solo y no permite salidas mayores al stock.
- **Kardex:** historial de movimientos por producto.
- **Panel:** total de productos, valor del inventario (solo administrador), alertas de stock bajo o agotado y últimos movimientos.
- **Diseño responsive** (escritorio y móvil).

## Roles y permisos

| Funcionalidad | Administrador | Trabajador |
|---|:---:|:---:|
| Panel, lista de productos y kardex | Sí | Sí |
| Registrar entradas y salidas | Sí | Sí |
| Ver valor total del inventario | Sí | No |
| Crear, editar y eliminar productos | Sí | No |

Los usuarios son simulados en el front-end. En un sistema real, la autenticación y los permisos se validarían en un servidor.

| Rol | Usuario | Contraseña |
|---|---|---|
| Administrador | admin | admin123 |
| Trabajador | trabajador | trabajador123 |

## Requisitos
- [Node.js](https://nodejs.org) 18.19 o superior (recomendado 20 o más)
- Angular CLI 18: `npm install -g @angular/cli@18`

## Instalación y ejecución
```bash
git clone <URL-DEL-REPOSITORIO>
cd inventario-escolar
npm install
ng serve
```
Abrir http://localhost:4200

## Pruebas
```bash
ng test    # pruebas unitarias (requiere Google Chrome instalado)
ng build   # compilación de producción
```
Pruebas incluidas: `ProductoModel` (lógica de stock), `EstadoStockPipe` y `AuthService` (login, roles y permisos).

## Estructura del proyecto
```
src/app/
├── auth/         Login, AuthService, modelo de usuario/rol, authGuard y rolGuard
├── dashboard/    Panel de control
├── productos/    Lista y formulario reactivo de productos
├── movimientos/  Registro de movimientos y kardex
├── shared/       Modelos, servicios, pipes, directiva, validadores y componente reutilizable
└── app-routing.module.ts   Rutas con carga diferida (lazy loading)
```

## Uso de TypeScript
- **Interfaces:** `Producto`, `Movimiento`, `Usuario`, `Sesion`.
- **Enums:** `Categoria`, `TipoMovimiento`, `Rol`.
- **POO:** clase `ProductoModel` con los métodos `tieneStockBajo()`, `estaAgotado()` y `aplicarMovimiento()`.
- **Servicios tipados:** `ProductoService`, `MovimientoService` y `AuthService` (datos en `localStorage`, sesión en `sessionStorage`).
- **Funciones tipadas:** guards (`CanActivateFn`) y validadores (`ValidatorFn`).

## Elementos de Angular
- **Pipes personalizados:** `estadoStock` y `tipoMovimiento`.
- **Directiva personalizada:** `appStockBajo` (resalta las filas con stock bajo o agotado).
- **Reactive Forms:** validaciones `required`, `min`, `pattern`, el validador personalizado `codigoUnico` y el validador de grupo `stockSuficiente`.
- **Componente reutilizable:** `app-page-title`.
- **Módulos por funcionalidad** con lazy loading, guard de autenticación y guard por rol.

## Cómo mejora el proceso de la tienda
Se pasa de hojas de cálculo sin control a un sistema con stock siempre actualizado, alertas antes de quedarse sin mercadería, historial completo (kardex) y permisos que evitan que un trabajador modifique el catálogo por error.
