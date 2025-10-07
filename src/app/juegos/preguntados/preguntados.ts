// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-preguntados',
// //   imports: [],
// //   templateUrl: './preguntados.html',
// //   styleUrl: './preguntados.css'
// // })
// // export class Preguntados {

// // }

// // import { Component, OnInit } from '@angular/core';
// // import { PokemonService } from '../../services/pokemon.service';

// // @Component({
// //   selector: 'app-preguntados',
// //   templateUrl: './preguntados.component.html',
// //   styleUrls: ['./preguntados.component.css']
// // })
// // export class PreguntadosComponent implements OnInit {

// //   pokemonImagen: string = '';
// //   opciones: string[] = [];
// //   respuestaCorrecta: string = '';
// //   puntos: number = 0;
// //   vidas: number = 5;

// //   constructor(private pokemonService: PokemonService) {}

// //   ngOnInit(): void {
// //     this.nuevaPregunta();
// //   }

// //   nuevaPregunta() {
// //     // Elegir un Pokémon random entre 1 y 150
// //     const idCorrecto = Math.floor(Math.random() * 150) + 1;

// //     // Traer el Pokémon correcto
// //     this.pokemonService.getPokemon(idCorrecto).subscribe(pokemon => {
// //       this.pokemonImagen = pokemon.sprites.front_default; // imagen
// //       this.respuestaCorrecta = pokemon.name;

// //       // Armar opciones (correcta + 3 falsas)
// //       this.armarOpciones(idCorrecto);
// //     });
// //   }

// //   armarOpciones(idCorrecto: number) {
// //     let opcionesSet = new Set<string>();
// //     opcionesSet.add(this.respuestaCorrecta);

// //     while (opcionesSet.size < 4) {
// //       let randomId = Math.floor(Math.random() * 150) + 1;
// //       this.pokemonService.getPokemon(randomId).subscribe(pokemon => {
// //         opcionesSet.add(pokemon.name);

// //         if (opcionesSet.size === 4) {
// //           this.opciones = Array.from(opcionesSet).sort(() => Math.random() - 0.5);
// //         }
// //       });
// //     }
// //   }

// //   responder(opcion: string) {
// //     if (opcion === this.respuestaCorrecta) {
// //       this.puntos += 10;
// //       this.nuevaPregunta();
// //     } else {
// //       this.vidas--;
// //       if (this.vidas > 0) {
// //         this.nuevaPregunta();
// //       } else {
// //         alert('¡Juego terminado! Puntos: ' + this.puntos);
// //       }
// //     }
// //   }
// // }
// // export class Preguntados { }



// import { Component, OnInit } from '@angular/core';
// import { PokemonService } from '../../services/pokemon.service';

// interface Pregunta {
//   nombre: string;
//   imagen: string;
//   opciones: string[];
//   correcta: string;
// }

// @Component({
//   selector: 'app-preguntados',
//   templateUrl: './preguntados.html',
//   styleUrls: ['./preguntados.css']
// })
// export class Preguntados implements OnInit {

//   preguntas: Pregunta[] = [];
//   preguntaActual!: Pregunta;
//   indice = 0;
//   puntos = 0;
//   vidas = 5;
//   mensaje = '';

//   constructor(private pokemonService: PokemonService) {}

//   ngOnInit() {
//     // definimos las preguntas a mano
//     this.preguntas = [
//       { nombre: 'pikachu', imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
//         opciones: ['pikachu', 'charizard', 'mewtwo', 'lapras'], correcta: 'pikachu' },

//       { nombre: 'mewtwo', imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png',
//         opciones: ['mewtwo', 'pidgeot', 'pikachu', 'lapras'], correcta: 'mewtwo' },

//       { nombre: 'charizard', imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
//         opciones: ['charizard', 'lapras', 'mewtwo', 'pikachu'], correcta: 'charizard' },

//       { nombre: 'lapras', imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png',
//         opciones: ['lapras', 'pikachu', 'pidgeot', 'charizard'], correcta: 'lapras' },

//       { nombre: 'pidgeot', imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png',
//         opciones: ['pidgeot', 'mewtwo', 'lapras', 'pikachu'], correcta: 'pidgeot' },
//     ];

//     this.preguntaActual = this.preguntas[this.indice];
//   }

//   responder(opcion: string) {
//     if (opcion === this.preguntaActual.correcta) {
//       this.puntos += 10;
//       this.mensaje = '✅ Correcto!';
//     } else {
//       this.vidas--;
//       this.mensaje = '❌ Incorrecto!';
//     }

//     setTimeout(() => {
//       this.mensaje = '';
//       this.siguientePregunta();
//     }, 1000);
//   }

//   siguientePregunta() {
//     this.indice++;
//     if (this.indice < this.preguntas.length && this.vidas > 0) {
//       this.preguntaActual = this.preguntas[this.indice];
//     } else {
//       this.mensaje = '🎮 Juego terminado. Puntos: ' + this.puntos;
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

interface Pregunta {
  nombre: string;
  imagen: string;
  opciones: string[];
  correcta: string;
}

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.html',
  styleUrls: ['./preguntados.css']
})
export class Preguntados implements OnInit {

  preguntas: Pregunta[] = [];
  preguntaActual!: Pregunta;
  indice = 0;
  puntos = 0;
  vidas = 5;
  mensaje = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    // definimos las preguntas a mano
    this.preguntas = [
      { nombre: 'pikachu', imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        opciones: ['pikachu', 'charizard', 'mewtwo', 'lapras'], correcta: 'pikachu' },

      { nombre: 'mewtwo', imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png',
        opciones: ['mewtwo', 'pidgeot', 'pikachu', 'lapras'], correcta: 'mewtwo' },

      { nombre: 'charizard', imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
        opciones: ['charizard', 'lapras', 'mewtwo', 'pikachu'], correcta: 'charizard' },

      { nombre: 'lapras', imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png',
        opciones: ['lapras', 'pikachu', 'pidgeot', 'charizard'], correcta: 'lapras' },

      { nombre: 'pidgeot', imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png',
        opciones: ['pidgeot', 'mewtwo', 'lapras', 'pikachu'], correcta: 'pidgeot' },
    ];

    this.preguntaActual = this.preguntas[this.indice];
  }

  responder(opcion: string) {
    if (opcion === this.preguntaActual.correcta) {
      this.puntos += 10;
      this.mensaje = '✅ Correcto!';
    } else {
      this.vidas--;
      this.mensaje = '❌ Incorrecto!';
    }

    setTimeout(() => {
      this.mensaje = '';
      this.siguientePregunta();
    }, 1000);
  }

  siguientePregunta() {
    this.indice++;
    if (this.indice < this.preguntas.length && this.vidas > 0) {
      this.preguntaActual = this.preguntas[this.indice];
    } else {
      this.mensaje = '🎮 Juego terminado. Puntos: ' + this.puntos;
    }
  }
}

