import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSousCommentComponent } from './add-sous-comment.component';

describe('AddSousCommentComponent', () => {
  let component: AddSousCommentComponent;
  let fixture: ComponentFixture<AddSousCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSousCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSousCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
