import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandUpdatesComponent } from './brand-updates.component';

describe('BrandUpdatesComponent', () => {
  let component: BrandUpdatesComponent;
  let fixture: ComponentFixture<BrandUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandUpdatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
