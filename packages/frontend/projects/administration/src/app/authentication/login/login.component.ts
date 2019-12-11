import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../vendors/src/lib/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  onLogin = () => {
    this.userService.login(this.email, this.password).subscribe(() => {
      this.router.navigate(['/'])
    });
  };
}
