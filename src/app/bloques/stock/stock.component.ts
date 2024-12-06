import { Component, Input } from '@angular/core';
import { Ropa } from '../../services/ropa.service';
import { Prenda } from '../../services/prenda.service';

/**
 * Logica del componente que muestra el nivel de stock coloreado.
 */
@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {

  @Input({required: true})
  public prenda!: Prenda

  /**
   * Calcula la clase css que tiene el color correspondiente al nivel de stock.
   */
  public get nivel() {
    if (this.prenda.stock > 10) {
      return 'alto'
    }
    else if (this.prenda.stock > 2) {
      return 'medio'
    }
    else {
      return 'bajo'
    }
  }

}
