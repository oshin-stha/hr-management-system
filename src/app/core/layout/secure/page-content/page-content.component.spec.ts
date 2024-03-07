import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageContentComponent } from './page-content.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PageContentComponent', () => {
  let component: PageContentComponent;
  let fixture: ComponentFixture<PageContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageContentComponent],
      imports: [RouterTestingModule],
    });
    fixture = TestBed.createComponent(PageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
