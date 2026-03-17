import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingyanComponent } from './thingyan.component';

describe('ThingyanComponent', () => {
  let component: ThingyanComponent;
  let fixture: ComponentFixture<ThingyanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThingyanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThingyanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
