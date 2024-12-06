import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../services/login.service';
import { Observable, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';

/**
 * Componente con la logica de la página de login.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule, CommonModule, AsyncPipe],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  /**
   * Nombre del usuario que se quiere loguear.
   */
  public nombre: string = '';
  /**
   * Clave del usuario que se quiere loguear.
   */
  public clave: string = '';
  /**
   * Error generado durante el login. Se carga del servicio de login.
   */
  public error: Observable<string | null>;
  /**
   * Indica si el usuario esta logueado o no.
   */
  public isLoggedIn: boolean = false;
  /**
   * Subscripción al obsevable del rol
   */
  private rolSubscription: Subscription | undefined;

  /**
   * Crea el componente.
   * @param loginService Servicio de login 
   * @param router Router para realizar las redirecciones.
   */
  constructor(private loginService: LoginService, private router: Router) {
    this.error = loginService.error;
  }

  /**
   * Inicialización del componente. Se suscrible al rol del loginService para redireccionar automáticamente
   * si el usuario se loguea correctamente (el rol deja de ser ANONIMO)
   */
  ngOnInit() {
    // Suscribirse al observable de rol
    this.rolSubscription = this.loginService.rol.subscribe(rol => {
      if (rol !== 'ANONIMO') this.router.navigate(['/'])
    });
  }

  /**
   * Cancelamos la suscripción para detectar cambios de rol.
   */
  ngOnDestroy() {
    // Asegúrate de limpiar la suscripción
    this.rolSubscription?.unsubscribe();
  }

  /**
   * Lanzamos el proceso de login (usando loginService).
   */
  public onLogin() {
    this.loginService.login(this.nombre, this.clave);
  }

  /**
   * Lanzamos el proceso de logout (usando loginService)
   */
  public onLogout() {
    this.loginService.logout();
    this.nombre = '';
    this.clave = '';
  }

}