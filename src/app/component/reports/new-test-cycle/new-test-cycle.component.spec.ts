import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTestCycleComponent } from './new-test-cycle.component';

describe('NewTestCycleComponent', () => {
  let component: NewTestCycleComponent;
  let fixture: ComponentFixture<NewTestCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTestCycleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTestCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
