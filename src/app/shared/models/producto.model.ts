// Enum: lista cerrada de valores permitidos (evita errores de escritura)
export enum Categoria {
  Cuadernos = 'Cuadernos',
  Lapiceros = 'Lapiceros',
  Papeleria = 'Papelería',
  Mochilas = 'Mochilas',
  Otros = 'Otros',
}

export enum TipoMovimiento {
  Entrada = 'ENTRADA',
  Salida = 'SALIDA',
}

// Interface: describe la "forma" que debe tener un objeto
export interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  categoria: Categoria;
  precio: number;
  stock: number;
  stockMinimo: number;
}

export interface Movimiento {
  id: number;
  productoId: number;
  tipo: TipoMovimiento;
  cantidad: number;
  fecha: string; // formato ISO
  motivo: string;
}

// Clase (POO): une los datos con el comportamiento (lógica de negocio)
export class ProductoModel implements Producto {
  constructor(
    public id: number,
    public codigo: string,
    public nombre: string,
    public categoria: Categoria,
    public precio: number,
    public stock: number,
    public stockMinimo: number
  ) {}

  // Crea una instancia de la clase a partir de un objeto simple (ej. el que viene de localStorage)
  static desde(p: Producto): ProductoModel {
    return new ProductoModel(p.id, p.codigo, p.nombre, p.categoria, p.precio, p.stock, p.stockMinimo);
  }

  tieneStockBajo(): boolean {
    return this.stock > 0 && this.stock <= this.stockMinimo;
  }

  estaAgotado(): boolean {
    return this.stock === 0;
  }

  aplicarMovimiento(tipo: TipoMovimiento, cantidad: number): void {
    if (cantidad <= 0) {
      throw new Error('La cantidad debe ser mayor a cero');
    }
    if (tipo === TipoMovimiento.Salida) {
      if (cantidad > this.stock) {
        throw new Error('No hay stock suficiente para esta salida');
      }
      this.stock -= cantidad;
    } else {
      this.stock += cantidad;
    }
  }
}
