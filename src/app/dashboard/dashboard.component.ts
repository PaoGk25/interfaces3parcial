import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Movimiento, Producto, ProductoModel, TipoMovimiento } from '../shared/models/producto.model';
import { MovimientoService } from '../shared/services/movimiento.service';
import { ProductoService } from '../shared/services/producto.service';
import { AuthService } from '../auth/services/auth.service';

// Chart.js necesita que le registremos sus piezas una sola vez
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  // Referencias a los <canvas> del HTML (#graficoStock y #graficoMovimientos)
  @ViewChild('graficoStock') canvasStock!: ElementRef<HTMLCanvasElement>;
  @ViewChild('graficoMovimientos') canvasMovimientos!: ElementRef<HTMLCanvasElement>;

  productos: Producto[] = [];
  alertas: Producto[] = [];
  ultimos: Movimiento[] = [];
  valorInventario = 0;
  mostrarAviso = true;

  private graficos: Chart[] = [];

  constructor(
    private productoService: ProductoService,
    private movimientoService: MovimientoService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.productos = this.productoService.listar();
    this.alertas = this.productos.filter(p => {
      const m = ProductoModel.desde(p);
      return m.estaAgotado() || m.tieneStockBajo();
    });
    this.valorInventario = this.productos.reduce((total, p) => total + p.precio * p.stock, 0);
    this.ultimos = this.movimientoService.ultimos(5);

    // El aviso se cierra solo a los 6 segundos
    setTimeout(() => (this.mostrarAviso = false), 6000);
  }

  // Los gráficos se crean aquí porque los <canvas> recién existen cuando la vista ya se dibujó
  ngAfterViewInit(): void {
    this.crearGraficoStock();
    this.crearGraficoMovimientos();
  }

  ngOnDestroy(): void {
    this.graficos.forEach(g => g.destroy());
  }

  nombreProducto(id: number): string {
    return this.productoService.obtenerPorId(id)?.nombre ?? 'Producto eliminado';
  }

  private crearGraficoStock(): void {
    const grafico = new Chart(this.canvasStock.nativeElement, {
      type: 'bar',
      data: {
        labels: this.productos.map(p => p.codigo),
        datasets: [
          { label: 'Stock actual', data: this.productos.map(p => p.stock), backgroundColor: '#1d4ed8' },
          { label: 'Stock mínimo', data: this.productos.map(p => p.stockMinimo), backgroundColor: '#f59e0b' },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
    this.graficos.push(grafico);
  }

  private crearGraficoMovimientos(): void {
    const movimientos = this.movimientoService.listar();
    const sumar = (tipo: TipoMovimiento) =>
      movimientos.filter(m => m.tipo === tipo).reduce((total, m) => total + m.cantidad, 0);

    const grafico = new Chart(this.canvasMovimientos.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Entradas', 'Salidas'],
        datasets: [{ data: [sumar(TipoMovimiento.Entrada), sumar(TipoMovimiento.Salida)], backgroundColor: ['#15803d', '#b91c1c'] }],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
    this.graficos.push(grafico);
  }
}
