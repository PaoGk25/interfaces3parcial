import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

// Lazy loading: cada módulo se descarga solo cuando el usuario entra a esa ruta
const routes: Routes = [
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', canActivate: [authGuard], loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'productos', canActivate: [authGuard], loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule) },
  { path: 'movimientos', canActivate: [authGuard], loadChildren: () => import('./movimientos/movimientos.module').then(m => m.MovimientosModule) },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
