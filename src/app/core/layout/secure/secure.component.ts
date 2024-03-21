import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getLoading } from 'src/app/shared/store/loader-store/loader-spinner.selector';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss'],
})
export class SecureComponent implements OnInit {
  isLoading$ = new Observable<boolean>();
  dashboardContent: string | undefined;
  isUser = true;
  isSideMenuOpen = true;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.isLoading$ = this.store.select(getLoading);
  }
  toggleSideMenu(): void {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }
}
