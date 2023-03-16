import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntariadoComponent } from './voluntariado.component';

describe('ViewComponent', () => {
  let component: VoluntariadoComponent;
  let fixture: ComponentFixture<VoluntariadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoluntariadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoluntariadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
