import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getLoading } from 'src/app/shared/store/loader-spinner.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoading$ = new Observable<boolean>();
  constructor(private store: Store<Store>) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getLoading);
  }
}
