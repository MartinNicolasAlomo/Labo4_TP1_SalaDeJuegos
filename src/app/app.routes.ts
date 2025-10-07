import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { Login } from './auth/login/login';
import { Registro } from './auth/registro/registro';
import { QuienSoy } from './quien-soy/quien-soy';
import { Error404 } from './error-404/error-404';
import { Juegos } from './juegos/juegos';
import { Resultados } from './resultados/resultados';
import { Chat } from './chat/chat';
import { Encuestas } from './encuestas/encuestas';
import { Ahorcado } from './juegos/ahorcado/ahorcado';
import { MayorMenor } from './juegos/mayor-menor/mayor-menor';
import { Preguntados } from './juegos/preguntados/preguntados';
import { Buscaminas } from './juegos/buscaminas/buscaminas';


export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'registro',
        component: Registro
    },
    {
        path: 'inicio',
        component: Inicio,
        children: [
            {
                path: 'ahorcado',
                component: Ahorcado
            },
            {
                path: 'mayor-menor',
                component: MayorMenor
            },
            {
                path: 'preguntados',
                component: Preguntados
            },
            {
                path: 'buscaminas',
                component: Buscaminas
            },
        ]
    },
    {
        path: 'juegos',
        component: Juegos
    },
    {
        path: 'resultados',
        component: Resultados
    },
    {
        path: 'chat',
        component: Chat
    },
    {
        path: 'encuestas',
        component: Encuestas
    },
    {
        path: 'quien-soy',
        component: QuienSoy
    },
    {
        path: '**',
        component: Error404
    }
];