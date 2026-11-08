import { Component, OnInit } from '@angular/core';
import { Producto } from '../../shared/models/producto.model';
import { ProductoService } from '../../shared/services/producto.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
})
export class ProductoListaComponent implements OnInit {
  productos: Producto[] = [];
  filtro = '';

  constructor(private productoService: ProductoService, public auth: AuthService) {}

  ngOnInit(): void {
    this.cargar();
  }

  get productosFiltrados(): Producto[] {
    const texto = this.filtro.trim().toLowerCase();
    return this.productos.filter(
      p => p.nombre.toLowerCase().includes(texto) || p.codigo.toLowerCase().includes(texto)
    );
  }

  eliminar(producto: Producto): void {
    if (!this.auth.esAdmin()) return; // defensa extra: solo el admin elimina
    if (confirm(`¿Eliminar "${producto.nombre}"?`)) {
      this.productoService.eliminar(producto.id);
      this.cargar();
    }
  }

  private cargar(): void {
    this.productos = this.productoService.listar();
  }
}
