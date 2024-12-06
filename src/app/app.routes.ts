import { Routes } from '@angular/router';
import { Pagina1Component } from './paginas/pagina1/pagina1.component';
import { CategoriaComponent } from './paginas/categoria/categoria.component';
import { LoginComponent } from './paginas/login/login.component';
import { RopaComponent } from './paginas/ropa/ropa.component';

export const routes: Routes = [
    {
        path: '',
        component: Pagina1Component
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'categoria/:id',
        component: CategoriaComponent
    },
    {
        path: 'ropa/:id',
        component: RopaComponent
    }
];