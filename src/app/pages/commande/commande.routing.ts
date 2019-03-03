import { Routes, RouterModule } from '@angular/router';
import { CommandeComponent } from './commande.component';

const childRoutes: Routes = [
    {
        path: '',
        component: CommandeComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
