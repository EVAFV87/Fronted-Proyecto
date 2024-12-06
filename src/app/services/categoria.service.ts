import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

/**
 * Define que campos contienen los objetos categoria que devuelve el servicio web.
 * Se corresponde con CategoriaDto en el backend.
 */
export interface Categoria {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {

  /**
   * Contiene la ultima lista de categorias obtenida del servidor. Esta lista se mostrará
   * en el menú de la aplicación.
   */
  private _categorias = new BehaviorSubject<Categoria[]>([]);

  /**
   * Constructor del servicio. Recibe el objeto httpClient para poder comunicarnos con
   * el backend.
   * @param httpClient Objeto para comunicarnos con el backend. 
   */
  constructor(private httpClient: HttpClient) {
  }

  public get categorias(): Observable<Categoria[]> {
    return this._categorias;
  }

  /**
   * Realiza una petición para recuperar del servidor la lista de objetos categoria. Es
   * un método asincrono, cuando tenga las categorias las dejará en el campo _categorias
   * para que desde ahí sea mostrado en la interface.
   */
  public cargarCategorias() {
    this.httpClient.get<Categoria[]>('/api/v1/categoria')
      .subscribe(result => this._categorias.next(result))
  }
}