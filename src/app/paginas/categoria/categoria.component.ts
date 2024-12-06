import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ropa, RopaService } from '../../services/ropa.service';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ItemRopaComponent } from "../../bloques/item-ropa/item-ropa.component";

/**
 * Contiene la logica del componente que muestra la lista de ropa de una
 * categoria.
 */
@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, AsyncPipe, ItemRopaComponent],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit{

  /**
   * Lista de ropa de la categoria (obtenida del servicio de ropa)
   */
  public ropas: Observable<Ropa[]>;

  /**
   * Crea el componente.
   * @param ropaService Servicio de ropa a usar.
   * @param ruta Ruta usada para cargar el componente (se saca de ella el id de categoria para cargar la ropa)
   */
  constructor(
    private ropaService: RopaService, 
    private ruta: ActivatedRoute) {
    this.ropas = this.ropaService.ropas;
  }

  /**
   * Se subscribe a cambios en los parametros de la ruta para sacar el id.
   */
  public ngOnInit(): void {
    this.ruta.params.subscribe((params) => this.onParametrosRutaCargados(params))
  }

  /**
   * Recibe los parametros de la ruta nuevos. Coge de ellos el id y lanza el proceso de carga de ropa
   * de la categoria
   * @param parametros Parametros de la ruta. 
   */
  private onParametrosRutaCargados(parametros: Params) {
    this.ropaService.cargarPorCategoria(parametros['id']);
  }
}