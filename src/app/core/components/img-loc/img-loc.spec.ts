import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgLoc } from './img-loc';

describe('ImgLoc', () => {
  let component: ImgLoc;
  let fixture: ComponentFixture<ImgLoc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgLoc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgLoc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
