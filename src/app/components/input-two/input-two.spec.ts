import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTwo } from './input-two';

describe('InputTwo', () => {
  let component: InputTwo;
  let fixture: ComponentFixture<InputTwo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTwo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTwo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
