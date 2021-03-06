import { Component, OnInit } from '@angular/core';
import { Roles, UserService } from '../../../../vendors/src/lib/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  fetchedUser = false;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.getCurrentUser('network-only').subscribe(user => {
      this.fetchedUser = true;

      if (user && user.role === Roles.MANAGER) {
        this.router.navigate(['/']).then(result => console.log('result', result), error => console.log(error));
      }
    });
  }

}
