import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './produit.routing';
import { SharedModule } from '../../shared/shared.module';
import { ProduitComponent } from './produit.component';
import { NouveauProduitComponent } from './nouveau-produit/nouveau.produit.component';
import { ListeProduitComponent } from './liste-produit/liste.produit.component';
import { FileDropModule } from 'ngx-file-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProduitService } from './produit.service';
import { CategorieService } from '../commande/categorie/categorie.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        FileDropModule
    ],
    declarations: [
        ProduitComponent,
        NouveauProduitComponent,
        ListeProduitComponent
    ],
    providers : [
        ProduitService
    ]
})
export class ProduitModule { }
