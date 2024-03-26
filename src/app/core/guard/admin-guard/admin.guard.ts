import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { SECURE_MODULE_PATH } from 'src/app/shared/constants/routes.constants';

export const adminGuard: CanMatchFn = () => {
  const router = inject(Router);
  const role = localStorage.getItem('role');
  const adminUrlTree: UrlTree = router.createUrlTree([`${SECURE_MODULE_PATH}`]);
  if (role === 'admin') return true;
  else return adminUrlTree;
};
