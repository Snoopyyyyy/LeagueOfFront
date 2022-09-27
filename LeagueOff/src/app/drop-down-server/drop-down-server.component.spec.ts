import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownServerComponent } from './drop-down-server.component';

describe('DropDownServerComponent', () => {
  let component: DropDownServerComponent;
  let fixture: ComponentFixture<DropDownServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownServerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropDownServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
