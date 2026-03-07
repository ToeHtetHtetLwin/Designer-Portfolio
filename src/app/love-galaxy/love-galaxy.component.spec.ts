import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoveGalaxyComponent } from './love-galaxy.component';

describe('LoveGalaxyComponent', () => {
  let component: LoveGalaxyComponent;
  let fixture: ComponentFixture<LoveGalaxyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoveGalaxyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoveGalaxyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
