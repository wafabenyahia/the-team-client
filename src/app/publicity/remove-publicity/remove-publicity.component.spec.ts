import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePublicityComponent } from './remove-publicity.component';

describe('RemovePublicityComponent', () => {
  let component: RemovePublicityComponent;
  let fixture: ComponentFixture<RemovePublicityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemovePublicityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovePublicityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
