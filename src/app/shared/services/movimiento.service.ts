import { Injectable } from '@angular/core';
import { Movimiento, ProductoModel, TipoMovimiento } from '../models/producto.model';
import { ProductoService } from './producto.service';

@Injectable({ providedIn: 'root' })
export class MovimientoService {
  private readonly CLAVE = 'movimientos';

  // Inyección de dependencias: Angular nos entrega el ProductoService ya creado
  constructor(private productoService: ProductoService) {}

  listar(): Movimiento[] {
    const datos = localStorage.getItem(this.CLAVE);
    return datos ? (JSON.parse(datos) as Movimiento[]) : [];
  }

  // Movimientos de un producto, del más reciente al más antiguo
  listarPorProducto(productoId: number): Movimiento[] {
    return this.listar()
      .filter(m => m.productoId === productoId)
      .sort((a, b) => b.fecha.localeCompare(a.fecha));
  }

  ultimos(cantidad: number): Movimiento[] {
    return [...this.listar()].sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, cantidad);
  }

  // Registra el movimiento Y actualiza el stock del producto
  registrar(productoId: number, tipo: TipoMovimiento, cantidad: number, motivo: string): Movimiento {
    const producto = this.productoService.obtenerPorId(productoId);
    if (!producto) {
      throw new Error('El producto no existe');
    }

    const modelo = ProductoModel.desde(producto);
    modelo.aplicarMovimiento(tipo, cantidad); // lanza error si no hay stock suficiente
    this.productoService.actualizar({ ...modelo });

    const movimiento: Movimiento = {
      id: Date.now(),
      productoId,
      tipo,
      cantidad,
      fecha: new Date().toISOString(),
      motivo: motivo.trim(),
    };
    localStorage.setItem(this.CLAVE, JSON.stringify([...this.listar(), movimiento]));
    return movimiento;
  }
}
