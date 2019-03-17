import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './commande.routing';
import { SharedModule } from '../../shared/shared.module';
import { CommandeComponent } from './commande.component';
import { TicketComponent } from './Ticket/ticket.component';
import { PanierComponent } from './panier/panier.component';
import { ModalModule } from 'ngx-modal';
import { CategorieComponent } from './categorie/categorie.component';
import { LayoutModule } from '../../shared/layout.module';
import { ProduitService } from '../produit/produit.service';
import { TicketService } from './Ticket/ticket.service';
import { CommandeService } from './commande.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        LayoutModule,
        routing,
        ModalModule
    ],
    declarations: [
        CommandeComponent,
        TicketComponent,
        PanierComponent,
        CategorieComponent
    ],
    providers : [
        ProduitService,
        TicketService,
        CommandeService
    ]
})
export class CommandeModule { }
