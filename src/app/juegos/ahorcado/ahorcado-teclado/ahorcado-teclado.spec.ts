import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorcadoTeclado } from './ahorcado-teclado';

describe('AhorcadoTeclado', () => {
  let component: AhorcadoTeclado;
  let fixture: ComponentFixture<AhorcadoTeclado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AhorcadoTeclado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AhorcadoTeclado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
