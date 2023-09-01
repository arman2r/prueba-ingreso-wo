import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTeamComponent } from './register-team.component';

describe('RegisterTeamComponent', () => {
  let component: RegisterTeamComponent;
  let fixture: ComponentFixture<RegisterTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterTeamComponent]
    });
    fixture = TestBed.createComponent(RegisterTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
