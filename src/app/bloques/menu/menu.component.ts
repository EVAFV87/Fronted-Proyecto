import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router, RouterLink } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { Categoria, CategoriaService } from '../../services/categoria.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AsyncPipe, CommonModule } from '@angular/common';
import { idText } from 'typescript';
import { LoginService, Rol } from '../../services/login.service';

/**
 * Logica del componente que muestra el menu de la aplicación. En el se muestran
 * las categorias y opciones de login y logout.
 */
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  /**
   * Listado de categorias a mostrar en el menu. Se obtienen de categoriaService.
   */
  public categorias: Observable<Categoria[]>;
  /**
   * Indica si estamos en la página de inicio o no.
   */
  public raiz: boolean = false;
  /**
   * rol actualmente logueado. Se saca de login service.
   */
  public rol: Observable<Rol>;
  /**
   * usuario actualmente logueado. Se saca de login service.
   */
  public usuario: Observable<string|null>;

  /**
   * Crea el componente
   * @param categoriasService Servicio de categorias
   * @param loginService Servicio de login
   * @param router Router para ir a otras paginas.
   */
  constructor(
      private categoriasService: CategoriaService,
      private loginService: LoginService,
      private router: Router) {
    this.categorias = this.categoriasService.categorias;
    this.usuario = this.loginService.usuario;
    this.rol = this.loginService.rol;
  }

  /**
   * Detectamos si estamos en la pagina de inicio (modificando el campo raiz en función de eso)
   * y lanzamos la carga de categorias en el servicio correspondiente.
   */
  public ngOnInit(): void {
    this.router.events
      .pipe(filter(r => r instanceof NavigationEnd))
      .subscribe(r => this.raiz = r.url === '/');
    this.categoriasService.cargarCategorias();
  }

  /**
   * Lanzamos el proceso de logout en el servicio de login.
   */
  public logout(): void {
    this.loginService.logout();
  }

}