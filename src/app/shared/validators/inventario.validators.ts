import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ProductoService } from '../services/producto.service';
import { TipoMovimiento } from '../models/producto.model';

// Validador personalizado: el código no debe repetirse (recibe una función para saber el id en edición)
export function codigoUnico(servicio: ProductoService, idActual: () => number | undefined): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = (control.value ?? '').toString();
    if (!valor.trim()) return null; // de lo vacío se encarga "required"
    return servicio.codigoExiste(valor, idActual()) ? { codigoDuplicado: true } : null;
  };
}

// Validador a nivel de grupo: una salida no puede superar el stock disponible
export function stockSuficiente(servicio: ProductoService): ValidatorFn {
  return (grupo: AbstractControl): ValidationErrors | null => {
    const productoId = Number(grupo.get('productoId')?.value);
    const tipo = grupo.get('tipo')?.value;
    const cantidad = Number(grupo.get('cantidad')?.value);
    if (!productoId || tipo !== TipoMovimiento.Salida || !cantidad) return null;
    const producto = servicio.obtenerPorId(productoId);
    return producto && cantidad > producto.stock ? { stockInsuficiente: producto.stock } : null;
  };
}
