import { Component, Input, OnInit } from '@angular/core';
import { Ropa, RopaService } from '../../services/ropa.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { PrendaService } from '../../services/prenda.service';
import { idText } from 'typescript';

/**
 * Logica del componente que muestra un item de ropa dentro de un listado. La ropa
 * a mostrar se recibe como parametro desde el componente que llama a este (en
 * principio categorias)
 */
@Component({
  selector: 'app-item-ropa',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './item-ropa.component.html',
  styleUrl: './item-ropa.component.css'
})
export class ItemRopaComponent {

  /**
   * Ropa recibida desde los componentes que usen app-item-ropa. @Input permite que estos
   * componentes envien a este la ropa que debe ser mostrada aquí.
   */
  @Input({ required: true })
  public ropa!: Ropa;

}