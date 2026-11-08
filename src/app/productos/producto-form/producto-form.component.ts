import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria, Producto } from '../../shared/models/producto.model';
import { ProductoService } from '../../shared/services/producto.service';
import { codigoUnico } from '../../shared/validators/inventario.validators';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
})
export class ProductoFormComponent implements OnInit {
  // inject() obtiene las dependencias de Angular ya disponibles al declarar las propiedades
  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  categorias = Object.values(Categoria);
  idEdicion?: number; // si tiene valor, estamos editando

  // Reactive Form: toda la definición y validaciones viven en TypeScript
  form = this.fb.nonNullable.group({
    codigo: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9-]{3,12}$/), codigoUnico(this.productoService, () => this.idEdicion)]],
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
    categoria: [Categoria.Cuadernos, Validators.required],
    precio: [0, [Validators.required, Validators.min(0.1)]],
    stock: [0, [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]],
    stockMinimo: [0, [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const producto = this.productoService.obtenerPorId(Number(id));
      if (!producto) {
        this.router.navigate(['/productos']);
        return;
      }
      this.idEdicion = producto.id;
      this.form.patchValue(producto); // rellena el formulario con los datos actuales
    }
  }

  get esEdicion(): boolean {
    return this.idEdicion !== undefined;
  }

  // Atajo para el HTML: devuelve true si el campo es inválido y el usuario ya lo tocó
  invalido(campo: string): boolean {
    const c = this.form.get(campo);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const datos = this.form.getRawValue();
    if (this.idEdicion !== undefined) {
      const actualizado: Producto = { id: this.idEdicion, ...datos };
      this.productoService.actualizar(actualizado);
    } else {
      this.productoService.agregar(datos);
    }
    this.router.navigate(['/productos']);
  }
}
