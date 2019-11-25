import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../_models';
import { AuthenticationService, AlertService } from '../_services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Profile deletion</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete <span class="text-primary">"John Doe"</span> profile?</strong></p>
    <p>All information associated to this user profile will be permanently deleted.
    <span class="text-danger">This operation can not be undone.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
})
export class NgbdModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}



@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {

  loading: boolean = false;
  clicked: boolean;
  currentUser: User;

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.clicked = true;
    this.currentUser = this.authenticationService.currentUserValue;
  }

  logout() {
    // this.submitted = true;
    this.loading = true;
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }

}