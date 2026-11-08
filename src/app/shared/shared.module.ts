import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EstadoStockPipe } from './pipes/estado-stock.pipe';
import { TipoMovimientoPipe } from './pipes/tipo-movimiento.pipe';
import { StockBajoDirective } from './directives/stock-bajo.directive';
import { PageTitleComponent } from './components/page-title/page-title.component';

const PIEZAS = [EstadoStockPipe, TipoMovimientoPipe, StockBajoDirective, PageTitleComponent];

@NgModule({
  declarations: PIEZAS,
  imports: [CommonModule],

  exports: [...PIEZAS, CommonModule, ReactiveFormsModule, RouterModule],
})
export class SharedModule {}
