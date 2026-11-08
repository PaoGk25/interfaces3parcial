import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductoListaComponent } from './producto-lista/producto-lista.component';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { rolGuard } from '../auth/auth.guard';
import { Rol } from '../auth/models/usuario.model';

const routes: Routes = [
  { path: '', component: ProductoListaComponent },
  // Solo el administrador puede crear o editar productos
  { path: 'nuevo', component: ProductoFormComponent, canActivate: [rolGuard([Rol.Admin])] },
  { path: 'editar/:id', component: ProductoFormComponent, canActivate: [rolGuard([Rol.Admin])] },
];

@NgModule({
  declarations: [ProductoListaComponent, ProductoFormComponent],
  imports: [SharedModule, FormsModule, RouterModule.forChild(routes)],
})
export class ProductosModule {}
