import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEditComponent } from './detail-edit.component';

describe('DetailEditComponent', () => {
  let component: DetailEditComponent;
  let fixture: ComponentFixture<DetailEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailEditComponent]
    });
    fixture = TestBed.createComponent(DetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
