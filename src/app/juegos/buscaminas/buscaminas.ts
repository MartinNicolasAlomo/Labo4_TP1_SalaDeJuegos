
// @Component({
//   selector: 'app-buscaminas',
//   imports: [],

// })
// export class Buscaminas {

// }


import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BarraNavegadora } from '../../barra-navegadora/barra-navegadora';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buscaminas',
  imports: [BarraNavegadora, RouterLink, RouterLinkActive, RouterOutlet, CommonModule],
  templateUrl: './buscaminas.html',
  styleUrl: './buscaminas.css'
})


export class Buscaminas implements OnInit {
  filas = 20;
  columnas = 20;
  lado = 30;
  marcas = 0;
  minas = this.filas * this.columnas * 0.1;
  tablero: any[][] = [];
  enJuego = true;
  juegoIniciado = false;

  // // sonidos
  // sonido_ganador = new Audio('assets/sonido_ganador.ogg');
  // sonido_win = new Audio('assets/sonido_win.ogg');
  // sonido_perdedor = new Audio('assets/sonido_perdedor.ogg');
  // sonido_gameover = new Audio('assets/sonido_gameover.ogg');
  // sonido_descubrir = new Audio('assets/sonido_descubrir.ogg');
  // sonido_juegonuevo = new Audio('assets/sonido_nuevojuego.ogg');
  // sonido_abrirarea = new Audio('assets/sonido_abrirarea.ogg');
  // sonido_marca = new Audio('assets/sonido_marca.ogg');

  ngOnInit() {
    this.nuevoJuego();
  }

  nuevoJuego() {
    // this.sonido_juegonuevo.play();
    this.reiniciarVariables();
    this.generarTableroJuego();
  }

  reiniciarVariables() {
    this.marcas = 0;
    this.enJuego = true;
    this.juegoIniciado = false;
    this.tablero = Array.from({ length: this.columnas }, () => Array(this.filas).fill(null));
  }

  async ajustes() {
    const { value: ajustes } = await Swal.fire({
      title: 'Ajustes',
      html: `
        Dificultad &nbsp; (minas/área)
        <br><br>
        <input id="dificultad" type="range" min="10" max="40" step="1"
          value="${(100 * this.minas) / (this.filas * this.columnas)}"
          oninput="document.getElementById('valor-dificultad').innerText=this.value+'%'">
        <span id="valor-dificultad">${(100 * this.minas) / (this.filas * this.columnas)}%</span>
        <br><br>
        Filas<br>
        <input class="swal2-input" type="number" value=${this.filas} id="filas" min="10" max="1000" step="1">
        <br>Columnas<br>
        <input class="swal2-input" type="number" value=${this.columnas} id="columnas" min="10" max="1000" step="1">
      `,
      confirmButtonText: 'Establecer',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      preConfirm: () => {
        const filas = Number((document.getElementById('filas') as HTMLInputElement).value);
        const columnas = Number((document.getElementById('columnas') as HTMLInputElement).value);
        const dificultad = Number((document.getElementById('dificultad') as HTMLInputElement).value);
        return { filas, columnas, dificultad };
      }
    });

    if (!ajustes) return;

    this.filas = Math.floor(ajustes.filas);
    this.columnas = Math.floor(ajustes.columnas);
    this.minas = Math.floor(this.columnas * this.filas * ajustes.dificultad / 100);
    this.nuevoJuego();
  }

  clicSimple(c: number, f: number, button: number) {
    if (!this.enJuego) return;
    if (this.tablero[c][f]?.estado === 'descubierto') return;

    switch (button) {
      case 0:
        if (this.tablero[c][f]?.estado === 'marcado') break;
        while (!this.juegoIniciado && this.tablero[c][f]?.valor === -1) {
          this.generarTableroJuego();
        }
        this.tablero[c][f].estado = 'descubierto';
        // this.sonido_descubrir.play();
        this.juegoIniciado = true;
        if (this.tablero[c][f].valor === 0) this.abrirArea(c, f);
        break;

      case 2:
        if (this.tablero[c][f]?.estado === 'marcado') {
          this.tablero[c][f].estado = undefined;
          this.marcas--;
        } else {
          this.tablero[c][f].estado = 'marcado';
          this.marcas++;
        }
        // this.sonido_marca.play();
        break;
    }
    this.refrescarTablero();
  }

  dobleClic(c: number, f: number) {
    if (!this.enJuego) return;
    this.abrirArea(c, f);
    this.refrescarTablero();
  }

  abrirArea(c: number, f: number) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        try {
          if (this.tablero[c + i][f + j]?.estado !== 'descubierto' &&
              this.tablero[c + i][f + j]?.estado !== 'marcado') {
            this.tablero[c + i][f + j].estado = 'descubierto';
            // this.sonido_abrirarea.play();
            if (this.tablero[c + i][f + j].valor === 0) {
              this.abrirArea(c + i, f + j);
            }
          }
        } catch {}
      }
    }
  }

  generarTableroJuego() {
    this.vaciarTablero();
    this.ponerMinas();
    this.contadoresMinas();
  }

  vaciarTablero() {
    this.tablero = Array.from({ length: this.columnas }, () => Array(this.filas).fill(null));
  }

  ponerMinas() {
    let colocadas = 0;
    while (colocadas < this.minas) {
      const c = Math.floor(Math.random() * this.columnas);
      const f = Math.floor(Math.random() * this.filas);
      if (!this.tablero[c][f]) {
        this.tablero[c][f] = { valor: -1 };
        colocadas++;
      }
    }
  }

  contadoresMinas() {
    for (let f = 0; f < this.filas; f++) {
      for (let c = 0; c < this.columnas; c++) {
        if (!this.tablero[c][f]) {
          let contador = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (i === 0 && j === 0) continue;
              try {
                if (this.tablero[c + i][f + j]?.valor === -1) contador++;
              } catch {}
            }
          }
          this.tablero[c][f] = { valor: contador };
        }
      }
    }
  }

  refrescarTablero() {
    this.verificarGanador();
    this.verificarPerdedor();
  }

  verificarGanador() {
    for (let f = 0; f < this.filas; f++) {
      for (let c = 0; c < this.columnas; c++) {
        if (this.tablero[c][f]?.estado !== 'descubierto' && this.tablero[c][f]?.valor !== -1) {
          return;
        }
      }
    }
    this.enJuego = false;
    // this.sonido_ganador.play();
    // this.sonido_win.play();
    Swal.fire('¡Ganaste!', '🎉 Has descubierto todas las celdas.', 'success');
  }

  verificarPerdedor() {
    for (let f = 0; f < this.filas; f++) {
      for (let c = 0; c < this.columnas; c++) {
        if (this.tablero[c][f]?.valor === -1 && this.tablero[c][f]?.estado === 'descubierto') {
          this.enJuego = false;
          // this.sonido_perdedor.play();
          // this.sonido_gameover.play();
          Swal.fire('💥 Game Over', 'Pisaste una mina.', 'error');
        }
      }
    }
  }
}
