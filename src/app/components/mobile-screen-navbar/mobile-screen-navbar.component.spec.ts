import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileScreenNavbarComponent } from './mobile-screen-navbar.component';

describe('MobileScreenNavbarComponent', () => {
  let component: MobileScreenNavbarComponent;
  let fixture: ComponentFixture<MobileScreenNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileScreenNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileScreenNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
