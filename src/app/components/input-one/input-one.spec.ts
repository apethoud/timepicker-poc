import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOne } from './input-one';

describe('InputOne', () => {
  let component: InputOne;
  let fixture: ComponentFixture<InputOne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputOne]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputOne);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
