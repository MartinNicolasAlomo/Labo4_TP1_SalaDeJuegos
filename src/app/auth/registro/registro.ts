// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Inicio } from '../../inicio/inicio';


// @Component({
//   selector: 'app-registro',
//   imports: [FormsModule, Inicio],
//   templateUrl: './registro.html',
//   styleUrl: './registro.css'
// })



// export class Registro {
//   email: string = '';
//   password: string = '';
//   usuarios: any[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
//   registroCorrecto: boolean | null = null;

//   constructor(private router: Router) { }

//   registrar() {

//     // validar si los datos son validos
//     // else {
//     const existe = this.usuarios.find(u => u.email === this.email);
//     if (existe) {
//       this.registroCorrecto = false;

//       console.log('El usuario ya existe');
//       return;
//     }

    
//     const nuevoUsuario = { email: this.email, password: this.password };
//     this.usuarios.push(nuevoUsuario);
//     localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
//     localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
//     this.registroCorrecto = true;
    
//     console.log('Usuario registrado con éxito');
//     this.router.navigate(['/home']);
//   }
// }

// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Inicio } from '../../inicio/inicio';



import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import Swal from 'sweetalert2';


const supabase = createClient('https://qjmetkznvjxtuxcjrzne.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqbWV0a3pudmp4dHV4Y2pyem5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNzUwNTAsImV4cCI6MjA3NDY1MTA1MH0.N_66ReA6BnI3AOMuTZlyVb2ZZIKN6wjhvOINPPONA9o');


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro{
  nombre_usuario: string = '';
  email: string = '';
  password: string = '';
  ingresoCorrecto: boolean | null = null;

  constructor(private router: Router) {}

  async registrar() {
    // Validación simple
    if (!this.nombre_usuario || !this.email || !this.password) {
      Swal.fire('Campos incompletos', 'Debe completar todos los campos', 'warning');
      return;
    }

    // 1️⃣ Crear usuario en Auth
    const { data, error } = await supabase.auth.signUp({
      email: this.email,
      password: this.password
    });

    if (error) {
      Swal.fire('Error', error.message, 'error');
      return;
    }

    // 2️⃣ Insertar datos adicionales en tabla "usuarios"
    // const { error: insertError } = await supabase
    //   .from('usuarios')
    //   .insert([
    //     { id: data.user?.id, nombre_usuario: this.nombre_usuario, email: this.email }
    //   ]);

    const { error: insertError } = await supabase
      .from('usuarios')
      .insert([
        { id: data.user?.id, nombre_usuario: this.nombre_usuario }
      ]);


    if (insertError) {
      Swal.fire('Error al guardar usuario', insertError.message, 'error');
      return;
    }

    // 3️⃣ Feedback al usuario
    Swal.fire('¡Cuenta creada!', 'Verifique su correo electrónico.', 'success');
    this.router.navigate(['/inicio']);
  }
}


