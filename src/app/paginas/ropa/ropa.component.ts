import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Prenda, PrendaService } from '../../services/prenda.service';
import { ActivatedRoute, Params } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { AsyncPipe } from '@angular/common';
import { Ropa, RopaService } from '../../services/ropa.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { StockComponent } from "../../bloques/stock/stock.component";
import { LoginService, Rol } from '../../services/login.service';

/**
 * Lógica del componente ropa, responsable de mostrar los detalles de una ropa.
 */
@Component({
  selector: 'app-ropa',
  standalone: true,
  imports: [MatTableModule, AsyncPipe, MatCardModule, MatButtonModule, StockComponent],
  templateUrl: './ropa.component.html',
  styleUrl: './ropa.component.css'
})
export class RopaComponent {

  /**
   * Lista de prendas a mostrar, obtenida del servicio prendas.
   */
  public prendas: Observable<Prenda[]>;
  /**
   * Nombre de las columnas que se mostrarán en la tabla de prendas. Depende del rol.
   */
  public columnas: string[] = [];

  /**
   * Objeto ropa que se mostrará, obtenido del servicio ropa.
   */
  public ropa: Observable<Ropa>;
  /**
   * Identificador recibido en la ruta usada para mostrar este componente. Usado
   * para cargar prendas y ropa y al actualizar stock.
   */
  public ropaId: number = 0;

  /**
   * Crea el componente con los servicios necesarios.
   * @param prendaService Para recuperar las prendas de la ropa-
   * @param ropaService  Para recuperar los detalles de la ropa
   * @param loginService Para saber el rol del usuario logueado.
   * @param ruta Para obtener el identificador de la ropa a mostrar.
   */
  constructor(
    private prendaService: PrendaService,
    private ropaService: RopaService,
    private loginService: LoginService, 
    private ruta: ActivatedRoute) {
    this.prendas = this.prendaService.prendas;
    this.ropa = this.ropaService.ropa;
  }

  /**
   * Define las operaciones a hacer cuando cambien:
   * - Los parametros de la ruta, para sacar el id.
   * - El rol logueado, para cambiar las columnas visibles.
   * - La ropa mostrada, para obtener el id.
   */
  public ngOnInit(): void {
    this.ruta.params.subscribe((params) => this.onParametrosRutaCargados(params))
    this.loginService.rol.subscribe((rol) => this.seleccionaColumnas(rol))
    this.ropa.subscribe((ropa) => this.ropaId = ropa.id)
  }

  /**
   * Obtenemos el id de la ruta usada para cargar el componente.
   * @param parametros parametros de la rupa
   */
  private onParametrosRutaCargados(parametros: Params) {
    this.prendaService.cargarPorRopa(parametros['id']);
    this.ropaService.cargarPorId(parametros['id']);
  }

  /**
   * Generamos las columnas visibles a partir del rol logueado.
   * @param rol rol logueado
   */
  private seleccionaColumnas(rol: Rol) {
    if (rol == 'ALMACEN') {
      this.columnas =  ['color', 'talla', 'stock', 'pasillo', 'estante', 'comprar', 'vender'];
    }
    else if (rol == 'TRABAJADOR') {
      this.columnas =  ['color', 'talla', 'stock', 'pasillo', 'estante', 'vender'];
    }
    else {
      this.columnas =  ['color', 'talla', 'stock'];
    }
  }

  /**
   * Lanzamos el proceso de incremento de stock en el servicio de prendas.
   * @param prendaId id de la prenda
   */
  public comprar(prendaId: number) {
    this.prendaService.incStockPrenda(this.ropaId, prendaId, 1);
  }

  /**
   * Lanzamos el proceso de decremento de stock en el servicio de prendas.
   * @param prendaId id de la prenda
   */
  public vender(prendaId: number) {
    this.prendaService.decStockPrenda(this.ropaId, prendaId, 1);
  }
}
