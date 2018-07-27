import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigScreenNavbarComponent } from './big-screen-navbar.component';

describe('BigScreenNavbarComponent', () => {
  let component: BigScreenNavbarComponent;
  let fixture: ComponentFixture<BigScreenNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigScreenNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigScreenNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
