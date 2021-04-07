import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaviEndComponent } from './navi-end.component';

describe('NaviEndComponent', () => {
  let component: NaviEndComponent;
  let fixture: ComponentFixture<NaviEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaviEndComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaviEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
