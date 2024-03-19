import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getLoading } from 'src/app/shared/store/loader-store/loader-spinner.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoading$ = new Observable<boolean>();
  role: string | null | undefined;
  isUser = true;
  @Output() isUserChange = new EventEmitter<boolean>();

  constructor(
    private store: Store<Store>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getLoading);
    this.role = localStorage.getItem('role');
    this.isUser = this.role === 'admin';
  }

  toggleAdminMode() {
    this.isUser = !this.isUser;
    this.isUserChange.emit(this.isUser);
  }
  logout(): void {
    const logout_confirmation_message = confirm(
      'Are you sure you want to logout',
    );
    if (logout_confirmation_message) {
      this.router.navigate(['']);
    }
  }
}
