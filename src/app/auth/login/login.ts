import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { MatButtonModule } from '@angular/material/button';


const supabase = createClient('https://qjmetkznvjxtuxcjrzne.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqbWV0a3pudmp4dHV4Y2pyem5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNzUwNTAsImV4cCI6MjA3NDY1MTA1MH0.N_66ReA6BnI3AOMuTZlyVb2ZZIKN6wjhvOINPPONA9o');


@Component({
  selector: 'app-login',
  imports: [FormsModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})



export class Login {
  titulo: string = "Bienvenido, Ingrese su usuario y clave";
  emailIngresado: string = '';
  claveIngresada: string = '';
  ingresoCorrecto: boolean | null = null;

  usuarios = [
    { emailRegistrado: 'martin@gmail.com', claveRegistrada: '123' }, // VERIFICAR QUE SEAN MAILS
    { emailRegistrado: 'pepe', claveRegistrada: '456' }
  ];

  constructor(private router: Router) { }

  iniciarSesion() {
    const user = this.usuarios.find(user => user.emailRegistrado === this.emailIngresado && user.claveRegistrada === this.claveIngresada);
    if (user) {
      this.ingresoCorrecto = true;
      localStorage.setItem('usuario', JSON.stringify(user));
      this.router.navigate(['/inicio']);
    } else {
      this.ingresoCorrecto = false;
      
    }
  }

  autocompletarDatosUsuarios(emailIngresado: string, claveIngresada: string) {
    this.emailIngresado = emailIngresado;
    this.claveIngresada = claveIngresada;
  }

  redirigirRegistro() {
    this.router.navigate(['/registro']);
  }

}


/*
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { createClient } from '@supabase/supabase-js'
import { environment } from '../../../environments/environment';

const supabase = createClient(environment.apiUrl, environment.publicAnonKey)

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})



export class LoginComponent {

  username: string = "";
  password: string = "";

  constructor(private router: Router) {
  
  }


  login() {
    supabase.auth.signInWithPassword({
      email: this.username,
      password: this.password,
    }).then(({ data, error }) => {
      if (error) {
        console.error('Error:', error.message);
      } else {
        this.router.navigate(['/home']);
      }
    });

  }

}
*/