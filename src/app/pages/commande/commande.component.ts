import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Ticket } from './Ticket/ticket.model';
import { Observable } from 'rxjs';
import {  map,filter, first } from 'rxjs/operators';

import 'rxjs/add/observable/of';
import { Categorie } from './categorie/categorie.model';
import { CategorieService } from './categorie/categorie.service';
import { ProduitService } from '../produit/produit.service';
import { ProfileUSer } from '../profile-user/profile-user.model';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client'
import { Constant } from '../../shared/constants/constants';


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
    listeCategorie   = [];
    firstElementCategorie;
    count:number = 0;
    constructor(private router: Router, private _activatedRouter: ActivatedRoute,private _categorieService: CategorieService,private _produitSerice: ProduitService) {
        this.initializeWebSocketConnection();
     }

    ngOnInit(): void {
        this.remplireCategorie();
        this.recuperationTouteLesProduitsParCategorie(this.firstElementCategorie.id);
    }


    recuperationTouteLesProduitsParCategorie(idCategorie) {
        this._produitSerice.getAllProduitByUser(idCategorie).subscribe(data => {
            this.listMenu = data;
            console.log('liste menu ',this.listMenu);
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
        this.count ++;
        this.ticket.date = Date.now().toString();
        this.ticket.numeroTicket = this.incrementNumber();
        this.ticket.totalTicket = this.totalTicket;
        this.ticket.listeProducts = new Map<number, any>();
        this.ticket.listeProducts = this.selectedListeProducts;
        
    }

    reset() {
        this.totalTicket = 0;
        //this.count = 0;
        this.selectedListeProducts = new Map<number, any>();
    }

    imprimer(event) {
        this.reset();
        console.log('partent validation impression',event);
        this.sendMessage();
    }

    remplireCategorie() {
        //@see CategorieResolver {} ../../shared/services/resolver/categorie.resolver
        this.listeCategorie =  this._activatedRouter.snapshot.data['listeCategories'];
        this.firstElementCategorie = this.listeCategorie[0];
        console.log('firstElement',this.firstElementCategorie); 
    }

    getCategorie(event) {
        this.recuperationTouteLesProduitsParCategorie(event.id);
        for (let index = 0; index < this.listeCategorie.length; index++) {
            if(this.listeCategorie[index].id != event.id) {
                this.listeCategorie[index].active = false;
            }
        }
        
    }

    // socket subscribe
  private ListeMessages : Array<any> = new Array();
  private serverUrl = Constant.serverUrlSocket;
  private stompClient;

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
    /*var url = ws._transport.url;
    url = url.replace("ws://http://localhost:8080/socket/",  "");
    url = url.replace("/websocket", "");
    url = url.replace(/^[0-9]+\//, "");
    console.log("Your current session is: " + url);*/
        that.stompClient.subscribe("/user/queue/specific-user/"+localStorage.getItem('id'), (message) => {
            if(message.body) {
            console.log('t',message.body);
            }
        });
    });
  }


  sendMessage(){
    this.ListeMessages.push({numeroTicket:this.ticket.numeroTicket,statut:'en cours de préparation'}); 
    let data :string = '';
    //data = this.ticket.numeroTicket.toString() + '...................' + 'en cours de préparation';
    this.stompClient.send("/app/user/queue/updates/"+localStorage.getItem('id') , {}, JSON.stringify(this.ListeMessages));
  }
  
  incrementNumber(): string {
    let value : string  = '';
    if(this.count < 10) {
       return  value = 'OOO'+this.count;
    }
    if(this.count >= 10 && this.count <100 ) {
       return  value = 'OO'+this.count;
    } 
    if(this.count >= 100 && this.count < 1000) {
       return value = 'O'+this.count;
    }
    if(this.count >= 1000) {
       return value = ''+this.count;
    }
  }

}