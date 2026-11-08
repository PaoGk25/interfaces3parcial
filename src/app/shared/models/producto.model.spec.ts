import { Categoria, ProductoModel, TipoMovimiento } from './producto.model';

describe('ProductoModel', () => {
  const crear = (stock: number) => new ProductoModel(1, 'CUA-001', 'Cuaderno', Categoria.Cuadernos, 5, stock, 10);

  it('suma stock en una entrada', () => {
    const p = crear(10);
    p.aplicarMovimiento(TipoMovimiento.Entrada, 5);
    expect(p.stock).toBe(15);
  });

  it('resta stock en una salida', () => {
    const p = crear(10);
    p.aplicarMovimiento(TipoMovimiento.Salida, 4);
    expect(p.stock).toBe(6);
  });

  it('lanza error si la salida supera el stock', () => {
    expect(() => crear(3).aplicarMovimiento(TipoMovimiento.Salida, 5)).toThrowError();
  });

  it('detecta stock bajo y agotado', () => {
    expect(crear(5).tieneStockBajo()).toBeTrue();
    expect(crear(0).estaAgotado()).toBeTrue();
    expect(crear(50).tieneStockBajo()).toBeFalse();
  });
});
