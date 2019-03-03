import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ticket } from './ticket.model';
import swal from 'sweetalert2';
import { Modal } from 'ngx-modal';

@Component({
    selector: 'app-ticket',
    templateUrl: 'ticket.component.html',
    styleUrls: ['ticket.component.css'],
})
export class TicketComponent implements OnInit {

    @Input('ticket') ticket: Ticket = undefined;
    @Output('notifyCommande') notifyCommande: EventEmitter <any> = new EventEmitter<any>();
    @Output('imprimerCommande') imprimerCommande: EventEmitter <any> = new EventEmitter<any>();

    constructor() {
    }

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
      this.notifyCommande.emit(this.ticket);
    }
    imprimer(modal) {
      modal.close();
      this.imprimerCommande.emit('impression en cours lancer de puis le ticket');
      this.onCloseValidateCommande();
    }

 
}
