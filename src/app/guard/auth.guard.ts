import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public storage: Storage) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storage.ready().then(() => {
        this.storage.get('currentUser').then((val) => {
          if (val) {
            resolve(true);
          } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            resolve(false);
          }
        });
      });
    });

  }
}