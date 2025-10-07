import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { MatButtonModule } from '@angular/material/button';


const supabase = createClient('https://qjmetkznvjxtuxcjrzne.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqbWV0a3pudmp4dHV4Y2pyem5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNzUwNTAsImV4cCI6MjA3NDY1MTA1MH0.N_66ReA6BnI3AOMuTZlyVb2ZZIKN6wjhvOINPPONA9o');


@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})



export class Login {
  titulo: string = "Bienvenido, Ingrese su usuario y clave";
  emailIngresado: string = '';
  claveIngresada: string = '';
  ingresoCorrecto: boolean | null = null;

  usuarios = [
    { emailRegistrado: 'alomomartin.27@gmail.com', claveRegistrada: 'supabase777' }, // VERIFICAR QUE SEAN MAILS
    { emailRegistrado: 'yojenik767@rograc.com', claveRegistrada: 'fulano555' }
  ];


  constructor(private router: Router) { }
  //e.quiroz@sistemas-utnfra.com.ar

  // iniciarSesionHardcodeada() {
  //   const user = this.usuarios.find(user => user.emailRegistrado === this.emailIngresado && user.claveRegistrada === this.claveIngresada);
  //   if (user) {
  //     this.ingresoCorrecto = true;
  //     localStorage.setItem('usuario', JSON.stringify(user));
  //     this.router.navigate(['/inicio']);
  //   } else {
  //     this.ingresoCorrecto = false;
  //   }
  // }

  iniciarSesion() {
    supabase.auth.signInWithPassword({
      email: this.emailIngresado,
      password: this.claveIngresada,
    }).then(({ data, error }) => {
      if (error) {
        console.error('Error al iniciar sesión:', error.message); // TOAST DURACION 20 SECS
        this.ingresoCorrecto = false;
      } else {
        this.ingresoCorrecto = true;
        localStorage.setItem('usuario', JSON.stringify(data.user));
        this.router.navigate(['/inicio']);
      }
    });
  }

  autocompletarDatosUsuarios(emailIngresado: string, claveIngresada: string) {
    this.emailIngresado = emailIngresado;
    this.claveIngresada = claveIngresada;
  }

  redirigirRegistro() {
    this.router.navigate(['/registro']);
  }
}