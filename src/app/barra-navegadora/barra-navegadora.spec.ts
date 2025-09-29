import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraNavegadora } from './barra-navegadora';

describe('BarraNavegadora', () => {
  let component: BarraNavegadora;
  let fixture: ComponentFixture<BarraNavegadora>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraNavegadora]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraNavegadora);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
