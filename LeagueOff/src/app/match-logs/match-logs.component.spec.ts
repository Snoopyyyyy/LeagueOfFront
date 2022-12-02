import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchLogsComponent } from './match-logs.component';

describe('MatchLogsComponent', () => {
  let component: MatchLogsComponent;
  let fixture: ComponentFixture<MatchLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchLogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
