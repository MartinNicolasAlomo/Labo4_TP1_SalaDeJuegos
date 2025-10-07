import { Component } from '@angular/core';
import { AhorcadoVista } from './ahorcado-vista/ahorcado-vista';
import { AhorcadoPregunta } from './ahorcado-pregunta/ahorcado-pregunta';
import { AhorcadoTeclado } from './ahorcado-teclado/ahorcado-teclado';

@Component({
  selector: 'app-ahorcado',
  imports: [AhorcadoVista, AhorcadoPregunta, AhorcadoTeclado],
  templateUrl: './ahorcado.html',
  styleUrl: './ahorcado.css'
})
export class Ahorcado {

}
