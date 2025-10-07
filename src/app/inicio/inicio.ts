import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { BarraNavegadora } from '../barra-navegadora/barra-navegadora';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-inicio',
  imports: [FormsModule, RouterLink, RouterLinkActive, BarraNavegadora, RouterOutlet, CommonModule],

  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})



export class Inicio {
 usuario: any = null;

  constructor(private router: Router) {
    // 🔹 si existe usuario logueado en localStorage lo cargo
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
    }
  }

  logout() {
    this.usuario = null;
    localStorage.removeItem('usuario'); // 🔹 limpio sesión
    this.router.navigate(['/login']);
  }  
}

