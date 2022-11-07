import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VueContentComponent } from './vue-content.component';

describe('VueContentComponent', () => {
  let component: VueContentComponent;
  let fixture: ComponentFixture<VueContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VueContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VueContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
