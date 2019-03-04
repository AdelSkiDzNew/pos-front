import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from './Ticket/ticket.model';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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
    constructor(private router: Router, private _categorieService: CategorieService,private _produitSerice: ProduitService) { }

    ngOnInit(): void {
        this.recuperationTouteLesProduits();
        this.remplireCategorie();
    }


    recuperationTouteLesProduits() {
        this._produitSerice.getAllProduitByUser().subscribe(data => {
            this.listMenu = data;
            console.log('liste menu ',this.listMenu);
        })
    }

    selectedProduct(item) {
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
        this._categorieService.getAllCategories()
            .subscribe(data => {
                this.listeCategorie = data;
            })
    }

    getCategorie(event) {
        this.recuperationTouteLesProduits();
        for (let index = 0; index < this.listeCategorie.length; index++) {
            if(this.listeCategorie[index].id != event.id)
            this.listeCategorie[index].active = false;
        }
        const array = new Array();
        this.listMenu.forEach(element => {
            if(element.idCategorie == event.id){
                array.push(element)
            }
        });
        this.listMenu = new Array();
        this.listMenu = array;
    }

}