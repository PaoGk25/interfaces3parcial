import { Pipe, PipeTransform } from '@angular/core';
import { TipoMovimiento } from '../models/producto.model';

// Uso en HTML: {{ movimiento.tipo | tipoMovimiento }}
@Pipe({ name: 'tipoMovimiento' })
export class TipoMovimientoPipe implements PipeTransform {
  transform(tipo: TipoMovimiento): string {
    return tipo === TipoMovimiento.Entrada ? 'Entrada' : 'Salida';
  }
}
