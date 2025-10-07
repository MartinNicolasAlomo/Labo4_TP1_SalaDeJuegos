import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorcadoPregunta } from './ahorcado-pregunta';

describe('AhorcadoPregunta', () => {
  let component: AhorcadoPregunta;
  let fixture: ComponentFixture<AhorcadoPregunta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AhorcadoPregunta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AhorcadoPregunta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
