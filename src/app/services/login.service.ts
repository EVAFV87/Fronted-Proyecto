import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Define los distintos roles disponibles.
 */
export type Rol = 'ANONIMO' | 'TRABAJADOR' | 'ALMACEN';

/**
 * Define los campos obtenidos del servicio al completar una operación de login (
 * el rol del usuario logueado)
 */
export interface RolDto {
  rol: Rol;
}

/**
 * Servicio que define las operaciones relacionadas con el login de usuarios.
 * Desde esta clase nos comunicamos con el backend.
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /**
   * rol actual del usuario logueado (ANONIMO si no hay usuario logueado)
   */
  private _rol = new BehaviorSubject<Rol>('ANONIMO');
  /**
   * nombre del usuario actualmente logueado (null si no hay usuario logueado)
   */
  private _usuario = new BehaviorSubject<string | null>(null);
  /**
   * ultimo error generado en el proceso de login (null si no se produzco error)
   */
  private _error = new BehaviorSubject<string | null>(null);

  /**
   * Constructor del servicio. Recibe el objeto httpClient para poder comunicarnos con
   * el backend.
   * @param httpClient Objeto para comunicarnos con el backend. 
   */
  constructor(private httpClient: HttpClient) { }

  public get rol(): Observable<Rol> {
    return this._rol;
  }

  public get error(): Observable<string | null> {
    return this._error;
  }

  public get usuario(): Observable<string | null> {
    return this._usuario;
  }

  /**
   * Realiza la operación de login en el backend. Como resultado se actualiza el campo _rol y _usuario
   * para reflejar el nuevo usuario logueado. También se puede actualizar _error si no se pudo completar
   * el login. Es un método asincrono, deja el resultado cuando lo tiene en los campos correspondientes.
   * @param nombre Nombre del usuario que se quiere loguear.
   * @param clave Clave del usuario que se quiere loguear.
   */
  public login(nombre: string, clave: string) {

    const body = new HttpParams()
      .set('nombre', nombre)
      .set('clave', clave);

    this.httpClient.post<RolDto>("/api/v1/login",
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded'),
        observe: 'response'
      }
    ).subscribe({
      next: response => {
        this._rol.next(response.body?.rol ?? 'ANONIMO')
        this._error.next(null)
        this._usuario.next(nombre)
      },
      error: error => {
        this._rol.next('ANONIMO')
        this._error.next('Usuario o contraseña no válidos')
        this._usuario.next(null)
      }
    }
    );

  }

  /**
   * Hace logout tanto en el servidor como en el cliente. Para ello se comunica con
   * el backend para indicarle que haga logout y actualiza en el cliente la información
   * de login del usuario (campos _rol y _usuario)
   */
  public logout() {

    this.httpClient.get("/api/v1/logout")
      .subscribe(() => {
        //restablecer rol
        this._rol.next('ANONIMO');
        this._usuario.next(null);
      })
  }
}