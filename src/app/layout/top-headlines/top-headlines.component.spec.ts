import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHeadlinesComponent } from './top-headlines.component';

describe('TopHeadlinesComponent', () => {
  let component: TopHeadlinesComponent;
  let fixture: ComponentFixture<TopHeadlinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopHeadlinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopHeadlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
