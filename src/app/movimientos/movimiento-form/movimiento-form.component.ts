import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Producto, TipoMovimiento } from '../../shared/models/producto.model';
import { MovimientoService } from '../../shared/services/movimiento.service';
import { ProductoService } from '../../shared/services/producto.service';
import { stockSuficiente } from '../../shared/validators/inventario.validators';

@Component({
  selector: 'app-movimiento-form',
  templateUrl: './movimiento-form.component.html',
})
export class MovimientoFormComponent {
  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);
  private movimientoService = inject(MovimientoService);

  tipos = Object.values(TipoMovimiento);
  productos: Producto[] = this.productoService.listar();
  mensaje = '';
  errorServicio = '';

  form = this.fb.nonNullable.group(
    {
      productoId: [0, [Validators.required, Validators.min(1)]],
      tipo: [TipoMovimiento.Entrada, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
      motivo: ['', [Validators.required, Validators.minLength(3)]],
    },
    { validators: stockSuficiente(this.productoService) } // validación del grupo completo
  );

  get productoSeleccionado(): Producto | undefined {
    return this.productoService.obtenerPorId(Number(this.form.controls.productoId.value));
  }

  invalido(campo: string): boolean {
    const c = this.form.get(campo);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  registrar(): void {
    this.mensaje = '';
    this.errorServicio = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { productoId, tipo, cantidad, motivo } = this.form.getRawValue();
    try {
      this.movimientoService.registrar(Number(productoId), tipo, Number(cantidad), motivo);
      this.mensaje = 'Movimiento registrado correctamente.';
      this.productos = this.productoService.listar(); // refresca el stock mostrado
      this.form.patchValue({ cantidad: 1, motivo: '' });
      this.form.controls.motivo.markAsUntouched();
      this.form.controls.motivo.markAsPristine();
    } catch (e) {
      this.errorServicio = (e as Error).message;
    }
  }
}
