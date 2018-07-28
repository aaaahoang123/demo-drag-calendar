import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoTableTdComponent } from './demo-table-td.component';

describe('DemoTableTdComponent', () => {
  let component: DemoTableTdComponent;
  let fixture: ComponentFixture<DemoTableTdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoTableTdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoTableTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
