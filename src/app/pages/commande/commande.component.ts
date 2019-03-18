import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Ticket } from './Ticket/ticket.model';
import { Observable } from 'rxjs';
import { map, filter, first } from 'rxjs/operators';

import 'rxjs/add/observable/of';
import { Categorie } from './categorie/categorie.model';
import { CategorieService } from './categorie/categorie.service';
import { ProduitService } from '../produit/produit.service';
import { ProfileUSer } from '../profile-user/profile-user.model';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client'
import { Constant } from '../../shared/constants/constants';

import { TicketService } from './Ticket/ticket.service';
import { Commande } from './model/commande.model';
import { TicketDto } from './model/ticketDto.model';
import { InformationTicket } from './model/iformationTicket.model';
import { CommandeService } from './commande.service';
import { SocketService } from '../../shared/services/socket.service';


@Component({
    selector: 'app-commande',
    templateUrl: './commande.component.html',
    styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {


    listMenu: Array<any>;
    profileUser: ProfileUSer;
    selectedListeProducts = new Map<number, any>();
    totalTicket: number;
    ticket: Ticket = {} as Ticket;
    listeCategorie = [];
    firstElementCategorie;
    commande: Commande = {} as Commande;
    informationTicket: InformationTicket = {} as InformationTicket;
    ticketDto: TicketDto = {} as TicketDto;
    private stompClient;
    constructor(private router: Router,
                private _activatedRouter: ActivatedRoute,
                private _ticketService: TicketService,
                private _produitSerice: ProduitService,
                private _commandeService: CommandeService,
                private _socketService: SocketService
            ) {
        this.stompClient = this._socketService.initializeWebSocketConnection(this.stompClient);
    }

    ngOnInit(): void {
        this.remplireCategorie();
        this.recuperationTouteLesProduitsParCategorie(this.firstElementCategorie.id);
    }


    recuperationTouteLesProduitsParCategorie(idCategorie) {
        this._produitSerice.getAllProduitByUser(idCategorie).subscribe(data => {
            this.listMenu = data;
            console.log('liste menu ', this.listMenu);
        })
    }

    selectedProduct(item) {
        this.playSound();
        this.totalTicket = 0;
        if (this.selectedListeProducts.has(item.idProduit)) {
            const copy = JSON.parse(JSON.stringify(item));
            copy.prixToTal = item.prixInitial + this.selectedListeProducts.get(item.idProduit).prixToTal;
            copy.quantite = this.selectedListeProducts.get(item.idProduit).quantite + 1;
            this.selectedListeProducts.set(item.idProduit, copy);
        } else {
            this.selectedListeProducts.set(item.idProduit, item);
        }
        this.calculateTotal(this.selectedListeProducts);
        window.scrollTo(0, 0);
    }

    playSound() {
        let audio = new Audio();
        audio.src = "../../../assets/button-37.wav";
        audio.load();
        audio.play();
    }

    calculateTotal(data: Map<number, any>) {
        for (const [key, value] of this.selectedListeProducts) {
            this.totalTicket = this.totalTicket + value.prixToTal;
        }
    }

    //recuperation total ticket apres le remove
    //la panier notife la commande
    removeProduit(event) {
        this.totalTicket = event;
    }
    notifyTicket(event) {
        this.ticket.date = Date.now().toString();
        //this.ticket.numeroTicket = this.incrementNumber();
        this.ticket.totalTicket = this.totalTicket;
        this.ticket.listeProducts = new Map<number, any>();
        this.ticket.listeProducts = this.selectedListeProducts;
        this.getNextTicketForToDayAndUser();
    }

    reset() {
        this.totalTicket = 0;
        //this.count = 0;
        this.selectedListeProducts = new Map<number, any>();
    }


    remplireCategorie() {
        //@see CategorieResolver {} ../../shared/services/resolver/categorie.resolver
        this.listeCategorie = this._activatedRouter.snapshot.data['listeCategories'];
        this.firstElementCategorie = this.listeCategorie[0];
        console.log('firstElement', this.firstElementCategorie);
    }

    getCategorie(event) {
        this.recuperationTouteLesProduitsParCategorie(event.id);
        for (let index = 0; index < this.listeCategorie.length; index++) {
            if (this.listeCategorie[index].id != event.id) {
                this.listeCategorie[index].active = false;
            }
        }

    }

    // cette methode permet de récupérer le prochain ticket par User, de la journée
    // elle permet aussi de construir la commande
    getNextTicketForToDayAndUser() {
        this._ticketService.getNextTicketForToDayAndUser().pipe(
            map(ticket => {
                return ticket.numeroTicket;
            })
        ).subscribe((numeroTicket) => {
            this.construirCommande(numeroTicket);
        });
    }
    // cette commande permet de construire la commande
    construirCommande(numeroTicket) {
        this.commande = {} as Commande;
        this.commande.idUser = parseInt(localStorage.getItem('id'));
        this.commande.statut = Constant.statutEncoursDePreparation;
        this.ticketDto = {} as TicketDto;
        this.ticketDto.dateDeCreation = Date.now().toString();
        this.ticketDto.numeroTicket = this.ticket.numeroTicket = numeroTicket;
        this.ticketDto.totalCommandeHT = this.totalTicket / 1.2;
        this.ticketDto.totalCommandeTTC= this.totalTicket;
        this.commande.ticketDto = this.ticketDto;
        this.commande.informationTicketDtos = new Array<InformationTicket>();
        for (const [key, value] of this.selectedListeProducts) {
             this.informationTicket = {} as InformationTicket;
             this.informationTicket.idProduit = value.idProduit;
             this.informationTicket.quantite = value.quantite;
             this.informationTicket.montantHT = value.prixToTal / 1.2;
             this.informationTicket.montantTTC = value.prixToTal;
             this.commande.informationTicketDtos.push(this.informationTicket);
        }
        console.log(this.commande);

    }
    // permet d'imprimer et valider et d'enregistrer la commande 
    // et l'envoyé au tunnel socket
    imprimer(event) {
        this.reset();
        console.log('partent validation impression', event);
        //enregister la commande 
        this.saveOrUpdateCommande();
    }

    // permet d'enregistrer la commande 
    // elle retourne un tbaleau de commande par 40 minutes
    // toutes les commandes moins de 40 minutes seront pas recupérés
    saveOrUpdateCommande() {
        this._commandeService.saveOrUpdateCommande(this.commande,true)
        .subscribe((data) => {
            localStorage.setItem('data',JSON.stringify(data));
            this.sendMessage(data);
        });
    }
    


    sendMessage(data) {
        this.stompClient.send("/app/user/queue/updates/" + localStorage.getItem('id'), {}, JSON.stringify(data));
    }


}