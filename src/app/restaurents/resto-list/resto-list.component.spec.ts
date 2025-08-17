import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoListComponent } from './resto-list.component';

describe('RestoListComponent', () => {
  let component: RestoListComponent;
  let fixture: ComponentFixture<RestoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestoListComponent]
    });
    fixture = TestBed.createComponent(RestoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
