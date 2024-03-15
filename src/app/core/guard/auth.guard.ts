import { inject } from '@angular/core';
import { CanMatchFn, UrlTree, Router } from '@angular/router';

export const authGuard: CanMatchFn = () => {
  const router = inject(Router);
  const userEmail = localStorage.getItem('Email');
  const loginUrlTree: UrlTree = router.createUrlTree(['']);

  if (userEmail) return true;
  else return loginUrlTree;
};
