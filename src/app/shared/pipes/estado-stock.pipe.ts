import { Pipe, PipeTransform } from '@angular/core';
import { Producto, ProductoModel } from '../models/producto.model';

// Uso en HTML: {{ producto | estadoStock }}
@Pipe({ name: 'estadoStock' })
export class EstadoStockPipe implements PipeTransform {
  transform(producto: Producto): 'Agotado' | 'Stock bajo' | 'Normal' {
    const modelo = ProductoModel.desde(producto);
    if (modelo.estaAgotado()) return 'Agotado';
    if (modelo.tieneStockBajo()) return 'Stock bajo';
    return 'Normal';
  }
}
