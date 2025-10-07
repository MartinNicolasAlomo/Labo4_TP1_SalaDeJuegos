import { Component } from '@angular/core';
import { BarraNavegadora } from '../barra-navegadora/barra-navegadora';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-juegos',
  imports: [BarraNavegadora, RouterLink, RouterLinkActive, RouterOutlet, CommonModule],
  templateUrl: './juegos.html',
  styleUrl: './juegos.css'
})
export class Juegos {
  constructor(private router: Router) {
  }
}
