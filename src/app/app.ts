import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuienSoy } from './quien-soy/quien-soy';
import { Login } from './auth/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, QuienSoy],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Labo4_TP1_SalaDeJuegos');
}
