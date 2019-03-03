import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-panier',
    templateUrl: './panier.component.html',
    styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

    @Input () selectedListeProducts = new Map<number, any>();
    @Input () totalTicket: number;
    
    constructor() { }

    ngOnInit(): void { }

    removeProduct(item) {
        this.totalTicket = 0;
        if (this.selectedListeProducts.has(item.idProduit)) {
            const copy = JSON.parse(JSON.stringify(item));
            if (copy.prixToTal > copy.prixInitial) {
                copy.prixToTal = this.selectedListeProducts.get(item.idProduit).prixToTal - item.prixInitial;
                copy.quantite = this.selectedListeProducts.get(item.idProduit).quantite - 1;
                this.selectedListeProducts.set(item.idProduit, copy);
            } else {
                this.selectedListeProducts.delete(item.idProduit);
            }
        }
        this.calculateTotal(this.selectedListeProducts);
    }

    calculateTotal(data: Map<number, any>) {
        for (const [key, value] of this.selectedListeProducts) {
            this.totalTicket = this.totalTicket + value.prixToTal;
        }
    }

}
