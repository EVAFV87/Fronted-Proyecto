import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';


/**
 * Define que campos contienen los objetos ropa que devuelve el servicio web.
 * Se corresponde con RopaDto en el backend.
 */
export interface Ropa {
  id: number;
  nombre: string;
  imagen: string;
  proveedor: string;
  descripcion: string;
}

/**
 * Servicio que define las operaciones relacionadas con ropa. Desde esta clase
 * nos comunicamos con el backend.
 */
@Injectable({
  providedIn: 'root'
})
export class RopaService {

  /**
   * Contiene la ultima lista de ropa obtenida del servidor. Esta lista se mostrará
   * en los listados de ropa de la aplicación.
   */
  private _ropas = new BehaviorSubject<Ropa[]>([]);

  /**
   * Contiene el último objeto ropa obtenido. Este objeto se mostrará en la pantalla
   * de detalles de una ropa.
   */
  private _ropa = new Subject<Ropa>();

  /**
   * Constructor del servicio. Recibe el objeto httpClient para poder comunicarnos con
   * el backend.
   * @param httpClient Objeto para comunicarnos con el backend. 
   */
  constructor(private httpClient: HttpClient) {
  }

  public get ropas(): Observable<Ropa[]> {
    return this._ropas;
  }

  public get ropa(): Observable<Ropa> {
    return this._ropa;
  }

  /**
   * Realiza una petición para recuperar del servidor la lista de objetos ropa de la
   * categoria indicada. Es un método asincrono, cuando tenga la ropa la dejará en el
   * campo _ropas para que desde ahí sea mostrado en la interface.
   * @param id identificador de la categoria de la que se quiere la ropa.
   */
  public cargarPorCategoria(id: number) {
    this.httpClient.get<Ropa[]>(`/api/v1/categoria/${id}/ropa`)
      .subscribe(result => this._ropas.next(result))

  }

  /**
   * Realiza una peticion al servidor para recuperar el objeto ropa cuyo id se indica.
   * Es un método asincrono, cuando tenga la ropa la dejará en el campo _ropa para que
   * desde ahí sea mostrado en la interface.
   * @param id identificador de la prenda.
   */
  public cargarPorId(id: number) {
    this.httpClient.get<Ropa>(`/api/v1/ropa/${id}`)
      .subscribe(result => this._ropa.next(result))

  }
}