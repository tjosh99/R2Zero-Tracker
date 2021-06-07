import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangaycontactComponent } from './barangaycontact.component';

describe('BarangaycontactComponent', () => {
  let component: BarangaycontactComponent;
  let fixture: ComponentFixture<BarangaycontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarangaycontactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarangaycontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
