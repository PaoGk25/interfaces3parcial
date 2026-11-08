import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { Producto, ProductoModel } from '../models/producto.model';

// Uso en HTML: <tr [appStockBajo]="producto"> -> resalta la fila según el stock
@Directive({ selector: '[appStockBajo]' })
export class StockBajoDirective implements OnChanges {
  @Input('appStockBajo') producto!: Producto;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(): void {
    const clases = ['fila-agotado', 'fila-bajo'];
    clases.forEach(c => this.renderer.removeClass(this.el.nativeElement, c));

    const modelo = ProductoModel.desde(this.producto);
    if (modelo.estaAgotado()) {
      this.renderer.addClass(this.el.nativeElement, 'fila-agotado');
    } else if (modelo.tieneStockBajo()) {
      this.renderer.addClass(this.el.nativeElement, 'fila-bajo');
    }
  }
}
