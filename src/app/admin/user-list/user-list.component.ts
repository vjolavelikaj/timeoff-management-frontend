import { Component, OnInit } from '@angular/core';
import { User } from '../../_models';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService, UserService } from '../../_services';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit  {

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.loadAllUsers()
    });
  }


  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  private loadAllUsers() {
    this.userService.getUsers().pipe(first()).subscribe(
      users => { 
        this.users = users; 
        console.log(this.users);
      },
      err => console.error(err),
      () => console.log('Users loaded')
    );
  }

}