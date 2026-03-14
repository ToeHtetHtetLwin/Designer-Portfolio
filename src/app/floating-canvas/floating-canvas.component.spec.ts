import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingCanvasComponent } from './floating-canvas.component';

describe('FloatingCanvasComponent', () => {
  let component: FloatingCanvasComponent;
  let fixture: ComponentFixture<FloatingCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingCanvasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatingCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
