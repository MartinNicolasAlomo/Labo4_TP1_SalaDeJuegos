import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorcadoVista } from './ahorcado-vista';

describe('AhorcadoVista', () => {
  let component: AhorcadoVista;
  let fixture: ComponentFixture<AhorcadoVista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AhorcadoVista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AhorcadoVista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
