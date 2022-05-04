import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePublicityComponent } from './update-publicity.component';

describe('UpdatePublicityComponent', () => {
  let component: UpdatePublicityComponent;
  let fixture: ComponentFixture<UpdatePublicityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePublicityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePublicityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
