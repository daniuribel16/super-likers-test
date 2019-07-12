import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['../login/login.component.sass', './register-user.component.sass']
})
export class RegisterUserComponent implements OnInit {
  private readonly notifier: NotifierService;

  user:any = {
    name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    repeat_pass: '',
  }

  constructor(private _userServices: UserService,
    private _router: Router,
    notifierService: NotifierService) {
      this.notifier = notifierService;
  }

  ngOnInit() {
  }

  validateUser() {
    if (!this.user.name || !this.user.last_name || !this.user.email || !this.user.phone
      || !this.user.password || !this.user.repeat_pass) {
      this.notifier.notify( 'error', 'Todos los campos son requeridos' );
      return false;
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = re.test(String(this.user.email).toLowerCase());
    if (!isValidEmail) {
      this.notifier.notify( 'error', 'Email no valido' );
      return false;
    }
    if (this.user.password !== this.user.repeat_pass) {
      this.notifier.notify( 'error', 'Los password deben coincidir' );
      return false;
    }
    return true;
  }

  registerUser() {
    if(!this.validateUser()) { return; }

    this._userServices.registerUser(this.user).subscribe((res:any) => {
      if (res.error) { this.notifier.notify( 'error', res.error ); return; }
      if (res._id) {
        localStorage.setItem('user', this.user.email);
        this._router.navigate(['/hangman']);
      } else {
        this.notifier.notify( 'error', 'Ha ocurrido un problema, intentalo de nuevo' );
      }
    });
  }
}
