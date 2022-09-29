import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchsListeComponent } from './matchs-liste.component';

describe('MatchsListeComponent', () => {
  let component: MatchsListeComponent;
  let fixture: ComponentFixture<MatchsListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchsListeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchsListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
