import { Routes, RouterModule } from '@angular/router';
import { ProduitComponent } from './produit.component';
import { NouveauProduitComponent } from './nouveau-produit/nouveau.produit.component';
import { ListeProduitComponent } from './liste-produit/liste.produit.component';

const childRoutes: Routes = [
    {
        path: '',
        component: ProduitComponent,
        children: [
            { path: 'nouveau-produit', component: NouveauProduitComponent },
            { path: 'liste-produit', component: ListeProduitComponent },
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
