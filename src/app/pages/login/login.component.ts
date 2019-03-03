import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from './login.model';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User;
  error: string;      

  constructor(private loginService:LoginService, private _router: Router) { }

  ngOnInit(): void {
    this.user = new User({ username: 'adel', password: 'adel' });
    this.reset();
}

reset() {
    this.error = '';
}

doLogin() {
    this.loginService.doLogin(this.user).pipe(
        map(user => user[1].id)
    ).subscribe(id => {
        localStorage.setItem('id',id);
        this._router.navigateByUrl('/pages/index');
        this.reset();
    }, err => {
        console.log(err);
        if (err.status === 401 || err.error.error_description === 'Bad credentials') {
            this.error = 'Le nom d\'utilisateur ou le mot de passe est incorrect';
        } 
        else {
            throw err;
        }
        this._router.navigateByUrl('/login');
    });
}

}
