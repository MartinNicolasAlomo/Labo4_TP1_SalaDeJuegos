import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-barra-navegadora',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './barra-navegadora.html',
  styleUrl: './barra-navegadora.css'
})


export class BarraNavegadora {
  constructor(private router: Router) {
  }
  /*
  ngOnInit() {
  const currentUrl = this.router.url;
  this.visibleSiempre = !currentUrl.startsWith('/juegos/');
}*/
  logout() {
    //  this.usuario = null;
    //localStorage.removeItem('usuario'); // 🔹 limpio sesión
    this.router.navigate(['/login']);
  }
}
