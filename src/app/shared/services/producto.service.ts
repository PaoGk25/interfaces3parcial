import { Injectable } from '@angular/core';
import { Categoria, Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private readonly CLAVE = 'productos';

  constructor() {
    // Si es la primera vez, cargamos productos de ejemplo para poder probar la app
    if (!localStorage.getItem(this.CLAVE)) {
      this.guardar(this.datosIniciales());
    }
  }

  listar(): Producto[] {
    const datos = localStorage.getItem(this.CLAVE);
    return datos ? (JSON.parse(datos) as Producto[]) : [];
  }

  obtenerPorId(id: number): Producto | undefined {
    return this.listar().find(p => p.id === id);
  }

  // idExcluido sirve al editar: el producto no debe compararse consigo mismo
  codigoExiste(codigo: string, idExcluido?: number): boolean {
    return this.listar().some(
      p => p.codigo.toLowerCase() === codigo.trim().toLowerCase() && p.id !== idExcluido
    );
  }

  agregar(datos: Omit<Producto, 'id'>): Producto {
    const productos = this.listar();
    const nuevo: Producto = { ...datos, id: Date.now() };
    productos.push(nuevo);
    this.guardar(productos);
    return nuevo;
  }

  actualizar(producto: Producto): void {
    this.guardar(this.listar().map(p => (p.id === producto.id ? producto : p)));
  }

  eliminar(id: number): void {
    this.guardar(this.listar().filter(p => p.id !== id));
  }

  private guardar(productos: Producto[]): void {
    localStorage.setItem(this.CLAVE, JSON.stringify(productos));
  }

  private datosIniciales(): Producto[] {
    return [
      { id: 1, codigo: 'CUA-001', nombre: 'Cuaderno cuadriculado A4 100 hojas', categoria: Categoria.Cuadernos, precio: 6.5, stock: 120, stockMinimo: 30 },
      { id: 2, codigo: 'LAP-001', nombre: 'Lapicero azul caja x12', categoria: Categoria.Lapiceros, precio: 9.9, stock: 8, stockMinimo: 15 },
      { id: 3, codigo: 'PAP-001', nombre: 'Papel bond A4 millar', categoria: Categoria.Papeleria, precio: 28, stock: 0, stockMinimo: 10 },
      { id: 4, codigo: 'MOC-001', nombre: 'Mochila escolar reforzada', categoria: Categoria.Mochilas, precio: 69.9, stock: 25, stockMinimo: 5 },
    ];
  }
}
