import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Movimiento, Producto } from '../../shared/models/producto.model';
import { MovimientoService } from '../../shared/services/movimiento.service';
import { ProductoService } from '../../shared/services/producto.service';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
})
export class KardexComponent implements OnInit {
  productos: Producto[] = [];
  movimientos: Movimiento[] = [];
  productoId = new FormControl<number>(0, { nonNullable: true });

  constructor(
    private productoService: ProductoService,
    private movimientoService: MovimientoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productos = this.productoService.listar();

    // Si venimos desde la lista de productos, viene ?producto=ID en la URL
    const desdeUrl = Number(this.route.snapshot.queryParamMap.get('producto'));
    if (desdeUrl) {
      this.productoId.setValue(desdeUrl);
      this.cargar(desdeUrl);
    }
    // valueChanges avisa cada vez que el usuario cambia la selección
    this.productoId.valueChanges.subscribe(id => this.cargar(Number(id)));
  }

  get producto(): Producto | undefined {
    return this.productoService.obtenerPorId(Number(this.productoId.value));
  }

  private cargar(id: number): void {
    this.movimientos = id ? this.movimientoService.listarPorProducto(id) : [];
  }
}
