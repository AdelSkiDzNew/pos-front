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
    constructor(private router: Router, private _activatedRouter: ActivatedRoute,private _categorieService: CategorieService,private _produitSerice: ProduitService) { }

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
        this.ticket.date = Date.now().toString();
        this.ticket.numeroTicket = 123333;
        this.ticket.totalTicket = this.totalTicket;
        this.ticket.listeProducts = new Map<number, any>();
        this.ticket.listeProducts = this.selectedListeProducts;
    }

    reset() {
        this.totalTicket = 0;
        this.selectedListeProducts = new Map<number, any>();
    }

    imprimer(event) {
        this.reset();
        console.log('partent validation impression',event);
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

}