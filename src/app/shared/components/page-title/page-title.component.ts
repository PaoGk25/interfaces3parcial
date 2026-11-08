import { Component, Input } from '@angular/core';

// Componente reutilizable: título de página con subtítulo opcional
@Component({
  selector: 'app-page-title',
  template: `
    <header class="page-title">
      <h1>{{ titulo }}</h1>
      <p *ngIf="subtitulo">{{ subtitulo }}</p>
    </header>
  `,
})
export class PageTitleComponent {
  @Input({ required: true }) titulo = '';
  @Input() subtitulo = '';
}
