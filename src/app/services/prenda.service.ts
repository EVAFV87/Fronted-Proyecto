import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Define que campos contienen los objetos prenda que devuelve el servicio web.
 * Se se corresponde con PrendaDto en el backend.
 */
export interface Prenda {
  id: number;
  color: string;
  talla: string;
  stock: number;
  pasillo: number;
  estante: number;
}

/**
 * Servicio que define las operaciones relacionadas con prenda. Desde esta clase
 * nos comunicamos con el backend.
 */
@Injectable({
  providedIn: 'root'
})
export class PrendaService {

  /**
   * Contiene la ultima lista de prenda obtenida del servidor. Esta lista se mostrará
   * en la página de detalles de ropa.
   */
  private _prendas = new BehaviorSubject<Prenda[]>([]);

  /**
   * Constructor del servicio. Recibe el objeto httpClient para poder comunicarnos con
   * el backend.
   * @param httpClient Objeto para comunicarnos con el backend. 
   */
  constructor(private httpClient: HttpClient) {
  }

  public get prendas(): Observable<Prenda[]> {
    return this._prendas;
  }

  /**
   * Realiza una petición para recuperar del servidor la lista de objetos prenda de la
   * ropa indicada. Es un método asincrono, cuando tenga la ropa la dejará en el
   * campo _prendas para que desde ahí sea mostrado en la interface.
   * @param id identificador de la ropa de la que se quiere las prendas.
   */
  public cargarPorRopa(id: number) {
    this.httpClient.get<Prenda[]>(`/api/v1/ropa/${id}/prenda`)
      .subscribe(result => this._prendas.next(result))

  }

  /**
   * Realiza una petición al backend para incrementar el stock de una prenda. Como
   * resultado de esta llamada también se actualizará el objeto _prendas con la
   * lista prendas con el stock actualizado. Es un método asincrono.
   * @param idRopa identificador de la ropa de la prenda (para poder cargar la lista
   * de prendas despues de la actualización).
   * @param idPrenda identificador de la prenda.
   * @param inc cantidad a incrementar (normalmente será 1, pero admite otros valores
   * para ampliaciones futuras).
   */
  public incStockPrenda(idRopa: number, idPrenda: number, inc: number) {

    const dto = {
      inc: inc
    };

    this.httpClient.patch<Prenda[]>(`/api/v1/ropa/${idRopa}/prenda/${idPrenda}/incstock`, dto)
      .subscribe(result => this._prendas.next(result))
  }

  /**
   * Realiza una petición al backend para decrementar el stock de una prenda. Como
   * resultado de esta llamada también se actualizará el objeto _prendas con la
   * lista prendas con el stock actualizado. Es un método asincrono.
   * @param idRopa identificador de la ropa de la prenda (para poder cargar la lista
   * de prendas despues de la actualización).
   * @param idPrenda identificador de la prenda.
   * @param inc cantidad a decrementar (normalmente será 1, pero admite otros valores
   * para ampliaciones futuras).
   */
  public decStockPrenda(idRopa: number, idPrenda: number, inc: number) {

    const dto = {
      inc: inc
    };

    this.httpClient.patch<Prenda[]>(`/api/v1/ropa/${idRopa}/prenda/${idPrenda}/decstock`, dto)
      .subscribe(result => this._prendas.next(result))
  }
}