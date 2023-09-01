import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTeamConfirmComponent } from './delete-team-confirm.component';

describe('DeleteTeamConfirmComponent', () => {
  let component: DeleteTeamConfirmComponent;
  let fixture: ComponentFixture<DeleteTeamConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteTeamConfirmComponent]
    });
    fixture = TestBed.createComponent(DeleteTeamConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
