import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  private readonly notifier: NotifierService;
  user: any = {
    email: '',
    password: '',
  };

  constructor(private _userServices: UserService,
      private _router: Router,
      notifierService: NotifierService) {
        this.notifier = notifierService;
  }

  ngOnInit() {
    const u = localStorage.getItem('user');
    if (u) this._router.navigate(['/hangman']);
  }

  validateCredentials() {
    let isValid = true;
    if (!this.user.email || !this.user.password) {
      isValid = false;
      this.notifier.notify( 'error', 'todos los campos son requeridos' );
    }
    return isValid;
  }

  loginUser() {
    if(!this.validateCredentials()) { return; }

    this._userServices.loginUser(this.user).subscribe((res:any) => {
      if (res.success) {
        localStorage.setItem('user', this.user.email);
        this._router.navigate(['/hangman']);
      } else {
        this.notifier.notify( 'error', 'credenciales invalidas' );
      }
    });
  }
}
