import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MovimientoFormComponent } from './movimiento-form/movimiento-form.component';
import { KardexComponent } from './kardex/kardex.component';

const routes: Routes = [
  { path: '', redirectTo: 'registrar', pathMatch: 'full' },
  { path: 'registrar', component: MovimientoFormComponent },
  { path: 'kardex', component: KardexComponent },
];

@NgModule({
  declarations: [MovimientoFormComponent, KardexComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class MovimientosModule {}
