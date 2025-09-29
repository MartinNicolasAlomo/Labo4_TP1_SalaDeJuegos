import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Inicio } from '../../inicio/inicio';


@Component({
  selector: 'app-registro',
  imports: [FormsModule, Inicio],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})



export class Registro {
  email: string = '';
  password: string = '';
  usuarios: any[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
  registroCorrecto: boolean | null = null;

  constructor(private router: Router) { }

  registrar() {

    // validar si los datos son validos
    // else {
    const existe = this.usuarios.find(u => u.email === this.email);
    if (existe) {
      this.registroCorrecto = false;

      console.log('El usuario ya existe');
      return;
    }

    
    const nuevoUsuario = { email: this.email, password: this.password };
    this.usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
    this.registroCorrecto = true;
    
    console.log('Usuario registrado con éxito');
    this.router.navigate(['/home']);
  }
}





