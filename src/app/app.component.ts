import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pagina1Component } from "./paginas/pagina1/pagina1.component";
import { MenuComponent } from "./bloques/menu/menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'evastur_frontend';
}
