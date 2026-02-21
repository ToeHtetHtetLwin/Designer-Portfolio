import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HappbirthdayComponent } from './happbirthday.component';

describe('HappbirthdayComponent', () => {
  let component: HappbirthdayComponent;
  let fixture: ComponentFixture<HappbirthdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HappbirthdayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HappbirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
