import { MainService } from './../main.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanActivateService implements CanActivate {

  constructor(private router: Router,private mainSV: MainService) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let tokenUser = localStorage.getItem('x-key-x-u-log');
    if(next.data.role == 'LOGIN'){
      if (!tokenUser) {
        this.router.navigate(['']);
      }
      return tokenUser ? true : false;
    }
    
    if(next.data && tokenUser ){
      return true;
    }
  }
}
