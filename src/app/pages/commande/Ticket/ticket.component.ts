import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ticket } from './ticket.model';
import swal from 'sweetalert2';
import { Modal } from 'ngx-modal';
import { ProfileUSer } from '../../profile-user/profile-user.model';
import { ProfileUserService } from '../../profile-user/profile-user.service';

@Component({
    selector: 'app-ticket',
    templateUrl: 'ticket.component.html',
    styleUrls: ['ticket.component.css'],
})
export class TicketComponent implements OnInit {

    @Input('ticket') ticket: Ticket = undefined;
    @Input('profileUser') profileUser: ProfileUSer = {} as ProfileUSer;
    @Output('notifyCommande') notifyCommande: EventEmitter <any> = new EventEmitter<any>();
    @Output('imprimerCommande') imprimerCommande: EventEmitter <any> = new EventEmitter<any>();


    constructor(private _profileService: ProfileUserService) {}

    ngOnInit(): void {
    }


    openModal(modal) {
      modal.open();
    }
  
    closeModal(modal) {
      modal.close();
    }
  
    onClose() {
      swal({
        type: 'success',
        title: 'Success!',
        text: 'close it!',
      });
    }

    onCloseValidateCommande() {
      swal({
        type: 'success',
        title: 'Success!',
        text: 'La commande a bien été validée, impression en cours...!',
      });
    }

    validateCommande() {
      if(localStorage.getItem('profile')) {
        this.profileUser = JSON.parse(localStorage.getItem('profile'));
      }else {
        this._profileService.getCurrentProfile().subscribe(data => {
          this.profileUser = data;
          localStorage.setItem('profile',JSON.stringify(this.profileUser));
        });
      }
      this.notifyCommande.emit(this.ticket);
    }
    imprimer(modal) {
      modal.close();
      this.imprimerCommande.emit('impression en cours lancer de puis le ticket');
      this.onCloseValidateCommande();
    }

 
}
