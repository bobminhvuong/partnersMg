import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVipComponent } from './register-vip.component';

describe('RegisterVipComponent', () => {
  let component: RegisterVipComponent;
  let fixture: ComponentFixture<RegisterVipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterVipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterVipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
