import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePublicationComponent } from './remove-publication.component';

describe('RemovePublicationComponent', () => {
  let component: RemovePublicationComponent;
  let fixture: ComponentFixture<RemovePublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemovePublicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovePublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
