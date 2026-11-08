import { Categoria } from '../models/producto.model';
import { EstadoStockPipe } from './estado-stock.pipe';

describe('EstadoStockPipe', () => {
  const pipe = new EstadoStockPipe();
  const prod = (stock: number) => ({ id: 1, codigo: 'X-1', nombre: 'X', categoria: Categoria.Otros, precio: 1, stock, stockMinimo: 10 });

  it('devuelve el estado según el stock', () => {
    expect(pipe.transform(prod(0))).toBe('Agotado');
    expect(pipe.transform(prod(4))).toBe('Stock bajo');
    expect(pipe.transform(prod(40))).toBe('Normal');
  });
});
